'use client'

import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/src/app/model/redux/store'
import styles from './FavoritesPage.module.scss'
import { PaintingListItem } from '@/src/shared/ui/PaintingListItem/PaintingListItem'
import { useFavoritePaintings } from '../api/useFavoritePaintings'

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
      setContent(<div className={styles.loading}>Загрузка...</div>)
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
      <ul className={styles.paintings_grid}>
        {paintingsArray.map((painting) => (
          <PaintingListItem
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
      </ul>
    )
  }, [paintings, isLoading, error])

  return (
    <div className={styles.favorites_page}>
      <h1>Избранные картины</h1>
      {content}
    </div>
  )
}
