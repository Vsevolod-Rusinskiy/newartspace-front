'use client'
import PaintingListItem from '@/components/modules/HomePage/PaintingListItem'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPaintings } from '@/lib/features/homePage/homePageSlice'
import { useEffect } from 'react'
import styles from '@/styles/page/page.module.scss'
import { IPainting } from '@/types/paintings'

interface RootState {
  paintings: {
    paintings: { data: IPainting[]; total: number }
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    error: string | null
  }
}

const HomePage = () => {
  const dispatch = useDispatch()
  const { paintings, loading, error } = useSelector(
    (state: RootState) => state.paintings
  )
  useEffect(() => {
    // @ts-expect-error: Temporary ignore until types are fixed
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

  if (loading === 'pending') return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  return (
    <main className={styles.main}>
      <section className={`container ${styles.content}`}>
        <ul className={styles.painting_list}>
          {paintingArray.map((painting: IPainting) => (
            <PaintingListItem
              key={painting.id}
              id={painting.id}
              src={painting.paintingUrl}
              alt={painting.name}
              price={painting.price}
              author={painting.author}
              name={painting.name}
              yearOfCreation={painting.yearOfCreation}
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
