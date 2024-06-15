'use client'
import PaintingListItem from '@/components/modules/HomePage/PaintingListItem'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPaintings } from '@/lib/features/homePage/homePageSlice'
import { useEffect } from 'react'
import styles from '@/styles/page/page.module.scss'


// todo any!!!
interface RootState {
  paintings: {
    paintings: any; // Замените на конкретный тип, представляющий массив работ
    loading: any; // Замените на конкретный тип, представляющий состояние загрузки
    error: any; // Замените на конкретный тип, представляющий состояние ошибки
  };
}

const HomePage = () => {
  const dispatch = useDispatch()
  const { paintings, loading, error } = useSelector((state: RootState) => state.paintings)
  useEffect(() => {
    dispatch(fetchPaintings())
  }, [dispatch])

  const paintingArray = Array.isArray(paintings.data) ? paintings.data : []

  useEffect(() => {
    if (loading === 'succeeded') {
      console.log('Paintings loaded:', paintings)
    }
    if (loading === 'failed') {
      console.error('Error loading paintings:', error)
    }
  }, [loading, paintings, error])

  if (loading === 'loading') return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  return (
    <main className={styles.main}>
      <section className={`container ${styles.content}`}>
        <ul className={styles.painting_list}>
          {paintingArray.map((painting) => (
            <PaintingListItem
              key={painting.id}
              id={painting.id}
              src={painting.paintingUrl}
              alt={painting.alt}
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
