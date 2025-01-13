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
import { FavoritesSkeleton } from './FavoritesSkeleton'
import { NoData } from '@/src/shared/ui/NoData/NoData'
import { PaintingActions } from '@/src/widgets/PaintingActions'
import styles from './FavoritesPage.module.scss'

export const FavoritesPage = () => {
  const dispatch = useAppDispatch()
  const { favoritePaintings, loading } = useSelector(
    (state: RootState) => state.favorites
  )

  const isLoading = loading === 'idle' || loading === 'pending'

  useEffect(() => {
    dispatch(initializeFavorites())
    dispatch(fetchFavoritePaintings())
  }, [dispatch])

  return (
    <main className={styles.main}>
      <div className={`container ${styles.navigation_container}`}>
        <NavigationButton direction='back' label='Назад' />
      </div>

      <div className='container'>
        {isLoading ? (
          <FavoritesSkeleton />
        ) : favoritePaintings.data.length === 0 ? (
          <NoData />
        ) : (
          <ul className={styles.favorites_list}>
            {favoritePaintings.data.map((painting) => (
              <li key={painting.id} className={styles.favorites_item}>
                <div className={styles.item_image}>
                  <Link href={`/${painting.id}`}>
                    <Image
                      src={painting.imgUrl}
                      alt={painting.title}
                      fill
                      className={styles.image}
                    />
                  </Link>
                </div>

                <div className={styles.item_content}>
                  <h2 className={styles.item_title}>{painting.title}</h2>
                  <div className={styles.item_details}>
                    <PaintingDetails painting={painting} />
                  </div>
                </div>

                <div className={styles.item_right_column}>
                  <div className={styles.item_price}>
                    <Price
                      size='small'
                      price={painting.price}
                      priceType={painting.priceType}
                      discount={painting.discount}
                    />
                  </div>
                  <div className={styles.item_actions}>
                    <PaintingActions
                      isReproducible={painting.isReproducible}
                      priceType={painting.priceType}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
