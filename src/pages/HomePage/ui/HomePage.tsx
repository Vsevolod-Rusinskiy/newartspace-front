'use client'
/* eslint-disable */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { fetchPaintingsAction } from '../model/homePageSlice'
import { PaintingListItem } from './PaintingListItem'
import { Paginate } from '@/src/shared/ui/Pagination/Pagination'
import styles from './HomePage.module.scss'

// test flag = true

interface IPainting {
  id: string
  author: string
  paintingUrl: string
  title: string
  artType: string
  price: number
  theme: string
  style: string
  materials: string
  height: number
  width: number
  yearOfCreation: number
  format: string
  color: string
}

interface PaintingsState {
  paintings: { data: IPainting[]; total: number }
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null | undefined
}

interface PaintingsRootState {
  paintings: PaintingsState
}

export const HomePage = () => {
  const dispatch = useDispatch()
  const { paintings, loading, error } = useSelector(
    (state: PaintingsRootState) => state.paintings
  )
  const [page, setPage] = useState(1)
  const [isDelaying, setIsDelaying] = useState(true)

  const limit = 9

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchPaintingsAction({ page, limit }))
  }, [dispatch, page])

  const handlePageClick = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1)
  }

  const paintingArray = Array.isArray(paintings.data) ? paintings.data : []

  useEffect(() => {
    if (loading === 'succeeded') {
      const timer = setTimeout(() => {
        setIsDelaying(false)
      }, 300)
      return () => clearTimeout(timer)
    } else if (loading === 'pending') {
      setIsDelaying(true)
    }
    if (loading === 'failed') {
      console.error('Error loading paintings:', error)
    }
  }, [loading, paintings, error])

  const isLoading = loading === 'idle' || loading === 'pending'

  if (error) return <div>Error: {error}</div>

  return (
    <main className={styles.main}>
      <section className={`container ${styles.content}`}>
        <ul className={styles.painting_list}>
          {isLoading || isDelaying
            ? Array.from({ length: 3 }).map((_, index) => (
                <li
                  key={index}
                  className={`${styles.painting_list_item} ${styles.skeleton_list_item}`}
                >
                  <div className={styles.skeleton_container}>
                    <Skeleton className={styles.skeleton_item} />
                  </div>
                </li>
              ))
            : paintingArray.map((painting: IPainting) => (
                <PaintingListItem
                  key={painting.id}
                  id={painting.id}
                  src={painting.paintingUrl}
                  alt={painting.title}
                  price={painting.price}
                  author={painting.author}
                  title={painting.title}
                  yearOfCreation={painting.yearOfCreation}
                  style={painting.style}
                  materials={painting.materials}
                  height={painting.height}
                  width={painting.width}
                />
              ))}
        </ul>
        {paintings.data.length > 0 && (
          <Paginate
            pageCount={Math.ceil(paintings.total / limit)}
            onPageChange={handlePageClick}
            forcePage={page - 1}
          />
        )}
      </section>
    </main>
  )
}
