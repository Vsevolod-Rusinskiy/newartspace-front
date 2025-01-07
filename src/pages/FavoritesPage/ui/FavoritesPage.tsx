'use client'

import { FC } from 'react'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import axios from 'axios'
import { RootState } from '@/src/app/model/redux/store'
import styles from './FavoritesPage.module.scss'
import { PaintingListItem } from '@/src/shared/ui/PaintingListItem/PaintingListItem'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const FavoritesPage: FC = () => {
  const favoriteIds = useSelector(
    (state: RootState) => state.favorites.favoriteIds
  )

  const {
    data: paintings,
    isLoading,
    error,
  } = useQuery(
    ['favoritePaintings', favoriteIds], // ключ для кэширования
    async () => {
      const response = await axios.get(`${API_URL}/paintings`, {
        params: { ids: favoriteIds.join(',') },
      })
      return response.data
    },
    {
      enabled: favoriteIds.length > 0, // запрос выполнится только если есть ID
    }
  )

  if (isLoading) {
    return <div className={styles.loading}>Загрузка...</div>
  }

  if (error) {
    return (
      <div className={styles.error}>
        Произошла ошибка при загрузке избранных картин
      </div>
    )
  }

  return (
    <div className={styles.favorites_page}>
      <h1>Избранные картины</h1>
      <div>
        {!paintings || paintings.length === 0 ? (
          <p>У вас пока нет избранных картин</p>
        ) : (
          <ul className={styles.paintings_grid}>
            {paintings.map((painting) => (
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
        )}
      </div>
    </div>
  )
}
