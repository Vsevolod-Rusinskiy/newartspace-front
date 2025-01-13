'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/src/app/model/redux/hooks'
import { RootState } from '@/src/app/model/redux/store'
import {
  initializeFavorites,
  fetchFavoritePaintings,
} from '@/src/entities/Favorites/model/favoritesSlice'
import NavigationButton from '@/src/shared/ui/buttons/NavigationButton/NavigationButton'
import { Price } from '@/src/shared/ui/Price/Price'
import { PaintingDetails } from '@/src/shared/ui/DetailsInfo'
import styles from './FavoritesPage.module.scss'

export const FavoritesPage = () => {
  const dispatch = useAppDispatch()
  const { favoritePaintings, loading } = useSelector(
    (state: RootState) => state.favorites
  )

  useEffect(() => {
    dispatch(initializeFavorites())
    dispatch(fetchFavoritePaintings())
  }, [dispatch])

  if (loading === 'pending') {
    return (
      <main className={styles.main}>
        <div className={`container ${styles.navigation_container}`}>
          <NavigationButton direction='back' label='Назад' />
        </div>
        <div className='container'>
          <p>Загрузка...</p>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.main}>
      <div className={`container ${styles.navigation_container}`}>
        <NavigationButton direction='back' label='Назад' />
      </div>

      <div className='container'>
        <div className={styles.favorites_list}>
          {favoritePaintings.data.map((painting) => (
            <div key={painting.id} className={styles.favorites_item}>
              <div className={styles.item_image}>
                <Link href={`/${painting.id}`}>
                  <Image
                    src={painting.imgUrl}
                    alt={painting.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </Link>
              </div>

              <div className={styles.item_content}>
                <h2 className={styles.item_title}>{painting.title}</h2>
                <div className={styles.item_details}>
                  <PaintingDetails painting={painting} />
                </div>
                <div className={styles.item_price}>
                  <Price
                    price={painting.price}
                    priceType={painting.priceType}
                    discount={painting.discount}
                  />
                </div>
              </div>
            </div>
          ))}

          {favoritePaintings.data.length === 0 && (
            <p>У вас пока нет избранных картин</p>
          )}
        </div>
      </div>
    </main>
  )
}
