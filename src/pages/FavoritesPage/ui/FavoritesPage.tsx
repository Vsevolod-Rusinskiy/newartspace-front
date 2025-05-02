'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { useAppDispatch, useAppSelector } from '@/src/app/model/redux/hooks'
import { RootState } from '@/src/app/model/redux/store'
import {
  initializeFavorites,
  fetchFavoritePaintings,
  toggleFavorite,
  syncFavoritesWithServer,
  fetchServerFavorites,
} from '@/src/pages/FavoritesPage/model/favoritesSlice'
import NavigationButton from '@/src/shared/ui/buttons/NavigationButton/NavigationButton'
import { Price } from '@/src/shared/ui/Price/Price'
import { PaintingDetails } from '@/src/shared/ui/DetailsInfo'
import { FavoritesSkeleton } from './FavoritesSkeleton'
import { NoData } from '@/src/shared/ui/NoData/NoData'
import { PaintingActions } from '@/src/widgets/PaintingActions'
import { Htag } from '@/src/shared/ui/Htag/Htag'
import FavoritesSVG from '@/src/shared/ui/svgIcons/FavoritesSVG'
import {
  AnimatedList,
  AnimatedListItem,
} from '@/src/shared/ui/AnimatedList/AnimatedList'
import styles from './FavoritesPage.module.scss'
import { selectIsLoggedIn } from '@/src/features/Auth'
import { slugify } from '@/src/shared/lib/slugify'

export const FavoritesPage = () => {
  const dispatch = useAppDispatch()
  const { favoritePaintings, loading } = useSelector(
    (state: RootState) => state.favorites
  )

  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const isLoading = loading === 'idle' || loading === 'pending'

  useEffect(() => {
    dispatch(initializeFavorites())

    if (isLoggedIn) {
      dispatch(fetchServerFavorites())
        .unwrap()
        .then(() => {
          dispatch(syncFavoritesWithServer())
        })
        .then(() => {
          dispatch(fetchFavoritePaintings())
        })
    } else {
      dispatch(fetchFavoritePaintings())
    }
  }, [dispatch, isLoggedIn])

  const handleToggleFavorite = (id: number) => {
    dispatch(toggleFavorite(id))
    if (isLoggedIn) {
      dispatch(syncFavoritesWithServer())
    }
  }

  return (
    <main className={styles.main}>
      <div className={`container ${styles.navigation_container}`}>
        <NavigationButton direction='back' label='Назад' />
        <Htag tag='h1'>Избранное</Htag>
      </div>

      <div className='container'>
        {isLoading ? (
          <FavoritesSkeleton />
        ) : favoritePaintings.data.length === 0 ? (
          <NoData />
        ) : (
          <AnimatedList className={styles.favorites_list}>
            {favoritePaintings.data.map((painting) => (
              <AnimatedListItem
                key={painting.id}
                className={styles.favorites_item}
                preset='fadeSlide'
              >
                <FavoritesSVG
                  className={styles.favorite_button}
                  isFilled={true}
                  onClick={() => handleToggleFavorite(Number(painting.id))}
                />
                <div className={styles.item_image}>
                  <Link
                    href={`/paintings/${painting.id}-${slugify(painting.title)}`}
                  >
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
                      paintingId={painting.id}
                    />
                  </div>
                </div>
              </AnimatedListItem>
            ))}
          </AnimatedList>
        )}
      </div>
    </main>
  )
}
