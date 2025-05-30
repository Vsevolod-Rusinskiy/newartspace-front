import { notFound } from 'next/navigation'
import { useAppDispatch } from '@/src/app/model/redux/hooks'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchPaintingByIdAction } from '../model/paintingCardItemSlice'
import PageSubTitle from '@/src/shared/ui/PageSubTitle/PageSubTitle'
import PageTextBlock from '@/src/shared/ui/PageTextBlock/PageTextBlock'
import NavigationButton from '@/src/shared/ui/buttons/NavigationButton/NavigationButton'
import { IPainting as BaseIPainting } from '../types/PaintingCardPage.type'
import FavoritesSVG from '@/src/shared/ui/svgIcons/FavoritesSVG'
import { Price } from '@/src/shared/ui/Price/Price'
import { PaintingCardSkeleton } from './PaintingCardSkeleton'
import styles from './PaintingCardPage.module.scss'
import {
  toggleFavorite,
  initializeFavorites,
} from '@/src/pages/FavoritesPage/model/favoritesSlice'
import { RootState } from '@/src/app/model/redux/store'
import { PaintingActions } from '@/src/widgets/PaintingActions'
import { PaintingDetails } from '@/src/shared/ui/DetailsInfo'
import { ImageWithWatermark } from '@/src/shared/ui/ImageWithWatermark/ImageWithWatermark'
import { useLang } from '@/src/shared/hooks/useLang'
import Head from 'next/head'

interface PaintingCardPageParams {
  params: {
    paintingCardId: string
  }
  initialData?: IPainting
}
export interface IArtist {
  artistName: string
}

export interface IPainting extends BaseIPainting {
  artist: IArtist
}

export interface PaintingState {
  painting: IPainting | null | undefined
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null | undefined
}

export interface PaintingRootState {
  painting: PaintingState
}

export const PaintingCardPage = (params: PaintingCardPageParams) => {
  const { paintingCardId } = params.params
  const { initialData } = params
  const dispatch = useAppDispatch()
  const { painting, loading, error } = useSelector(
    (state: PaintingRootState) => state.painting
  )
  const { lang, translations } = useLang()

  const isLoading = loading === 'idle' || loading === 'pending'

  const { imgUrl, title, description, author, yearOfCreation } =
    painting || ({} as IPainting)

  useEffect(() => {
    if (error === 'Painting not found' || isNaN(Number(paintingCardId))) {
      notFound()
    }
  }, [error, paintingCardId])

  useEffect(() => {
    if (initialData) {
      dispatch({ type: 'painting/setPaintingData', payload: initialData })
    } else if (paintingCardId) {
      dispatch(fetchPaintingByIdAction(paintingCardId))
    }
  }, [dispatch, initialData, paintingCardId])

  useEffect(() => {
    dispatch(initializeFavorites())
  }, [dispatch])

  const { favoriteIds, isInitialized } = useSelector(
    (state: RootState) => state.favorites
  )
  const isFavorite =
    isInitialized && favoriteIds.includes(Number(paintingCardId))

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(Number(paintingCardId)))
  }

  return (
    <main className={styles.main}>
      {painting && !isLoading && (
        <Head>
          <title>{`${title} - ${author} (${yearOfCreation})`}</title>
          <meta
            name='description'
            content={
              description
                ? description.substring(0, 160) + '...'
                : `${title}, ${painting.technique}, ${painting.height}x${painting.width}см, ${yearOfCreation}г.`
            }
          />
        </Head>
      )}
      <div className={`container ${styles.navigation_container}`}>
        <NavigationButton direction='back' label='Назад' />
        <FavoritesSVG
          className={styles.favorites_svg}
          isFilled={isFavorite}
          onClick={handleToggleFavorite}
        />
      </div>
      <article className={`container ${styles.painting_card_container}`}>
        {isLoading ? (
          <PaintingCardSkeleton />
        ) : (
          <>
            <section className={`${styles.image_container} ${styles.section}`}>
              <ImageWithWatermark
                src={imgUrl}
                alt={title}
                width={100}
                height={100}
                className={styles.image}
                unoptimized
              />
            </section>
            <section
              className={`${styles.details_container} ${styles.section}`}
            >
              <header>
                <h1 className={styles.title}>{title}</h1>
              </header>
              <div className={styles.description}>
                {painting && (
                  <PaintingDetails
                    className={styles.details}
                    painting={{
                      ...painting,
                      id: Number(paintingCardId),
                    }}
                  />
                )}
              </div>
              <div className={styles.price_container}>
                {painting && (
                  <Price
                    size='small'
                    priceType={painting.priceType}
                    discount={painting.discount}
                    price={painting.price}
                  />
                )}
              </div>
              <footer className={styles.actions}>
                <PaintingActions
                  priceType={painting?.priceType}
                  paintingId={Number(paintingCardId)}
                />
              </footer>
            </section>
            {description && (
              <section className={styles.section}>
                <PageSubTitle
                  text={translations[lang].common.painting_description}
                />
                <PageTextBlock text={description} />
              </section>
            )}
          </>
        )}
      </article>
    </main>
  )
}
