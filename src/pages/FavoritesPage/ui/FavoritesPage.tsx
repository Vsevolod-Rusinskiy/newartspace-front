'use client'

import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/src/app/model/redux/store'
import styles from './FavoritesPage.module.scss'
import { HorizontalPaintingCard } from '@/src/shared/ui/HorizontalPaintingCard'
import { useFavoritePaintings } from '../api/useFavoritePaintings'
import { Htag } from '@/src/shared/ui/Htag/Htag'

export const FavoritesPage: FC = () => {
  const [content, setContent] = useState<React.ReactNode>(null)
  const favoriteIds = useSelector(
    (state: RootState) => state.favorites.favoriteIds
  )

  const {
    data: paintings,
    isLoading,
    error,
  } = useFavoritePaintings(favoriteIds)

  useEffect(() => {
    if (isLoading) {
      setContent(
        <div className={styles.paintings_list}>
          {[1, 2, 3].map((_, index) => (
            <HorizontalPaintingCard
              key={index}
              id=''
              src=''
              alt=''
              author=''
              title=''
              price={0}
              yearOfCreation={0}
              style=''
              material=''
              technique=''
              height={0}
              width={0}
              priceType=''
              discount={0}
              isLoading={true}
            />
          ))}
        </div>
      )
      return
    }

    if (error) {
      setContent(
        <div className={styles.error}>
          Произошла ошибка при загрузке избранных картин
        </div>
      )
      return
    }

    const paintingsArray = Array.isArray(paintings) ? paintings : []

    if (!paintingsArray || paintingsArray.length === 0) {
      setContent(<p>У вас пока нет избранных картин</p>)
      return
    }

    setContent(
      <div className={styles.paintings_list}>
        {paintingsArray.map((painting) => (
          <HorizontalPaintingCard
            key={painting.id}
            id={painting.id}
            src={painting.imgUrl}
            alt={painting.title}
            author={painting.author}
            title={painting.title}
            price={painting.price}
            yearOfCreation={painting.yearOfCreation}
            style={painting.style}
            material={painting.material}
            technique={painting.technique}
            height={painting.height}
            width={painting.width}
            priceType={painting.priceType}
            discount={painting.discount}
          />
        ))}
      </div>
    )
  }, [paintings, isLoading, error])

  return (
    <main className={styles.main}>
      <section className={`container ${styles.content}`}>
        <Htag tag='h1'>Избранные картины</Htag>
        {content}
      </section>
    </main>
  )
}
