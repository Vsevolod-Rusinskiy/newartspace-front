'use client'
/* eslint-disable */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPaintings } from '@/lib/features/homePage/homePageSlice'
import PaintingListItem from '@/components/modules/HomePage/PaintingListItem'
import { IPainting, PaintingsRootState } from '@/types/painting'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from '@/styles/page/page.module.scss'

const HomePage = () => {
  const dispatch = useDispatch()
  const { paintings, loading, error } = useSelector(
    (state: PaintingsRootState) => state.paintings
  )
  useEffect(() => {
    // @ts-ignore
    dispatch(fetchPaintings())
  }, [dispatch])

  const paintingArray = Array.isArray(paintings.data) ? paintings.data : []

  useEffect(() => {
    if (loading === 'pending') {
      console.log('Paintings loaded:', paintings)
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
          {isLoading
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
                  base={painting.base}
                  materials={painting.materials}
                  height={painting.height}
                  width={painting.width}
                />
              ))}
        </ul>
      </section>
    </main>
  )
}

export default HomePage
