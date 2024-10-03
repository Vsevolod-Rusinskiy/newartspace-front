'use client'
/* eslint-disable */
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/src/app/model/redux/hooks'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { fetchPaintingsAction } from '../model/homePageSlice'
import { RootState } from '@/src/app/model/redux/store'
import { PaintingListItem } from './PaintingListItem'
import { Paginate } from '@/src/shared/ui/Pagination/Pagination'
import { Htag } from '@/src/shared/ui/Htag/Htag'
import { ActionButton } from '@/src/shared/ui/buttons/ActionButton/ActionButton'
import styles from './HomePage.module.scss'

export const HomePage = () => {
  const dispatch = useAppDispatch()
  const { paintings, loading, error } = useSelector(
    (state: RootState) => state.paintings
  )
  const [page, setPage] = useState(1)
  const [isDelaying, setIsDelaying] = useState(true)

  const limit = 9

  useEffect(() => {
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
        <div className={styles.content_header}>
          <ActionButton className={styles.filter_button}>Фильтры</ActionButton>
          <Htag tag='h1' className={styles.catalog_title}>
            Каталог
          </Htag>
          <ActionButton className={styles.sort_button}>Сортировка</ActionButton>
        </div>

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
            : paintingArray.map((painting) => (
                <PaintingListItem
                  key={painting.id}
                  id={painting.id}
                  src={painting.imgUrl}
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
