import Image from 'next/image'
import { notFound } from 'next/navigation'
import { useAppDispatch } from '@/src/app/model/redux/hooks'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import { fetchPaintingByIdAction } from '../model/paintingCardItemSlice'
import PageSubTitle from '@/src/shared/ui/PageSubTitle/PageSubTitle'
import PageTextBlock from '@/src/shared/ui/PageTextBlock/PageTextBlock'
import NavigationButton from '@/src/shared/ui/buttons/NavigationButton/NavigationButton'
import { actionOpenModal } from '@/src/shared/ui/modals/Modal/model/modalVisibilitySlice'
import { IPainting as BaseIPainting } from '../types/PaintingCardPage.type'
import { DefaultButton } from '@/src/shared/ui/buttons/DefaultButton/DefaultButton'
import cn from 'classnames'
import { Price } from '@/src/shared/ui/Price/Price'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from './PaintingCardPage.module.scss'

interface PaintingCardItemParams {
  params: {
    paintingCardId: string
  }
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

export const PaintingCardItem = (params: PaintingCardItemParams) => {
  const { paintingCardId } = params.params
  const dispatch = useAppDispatch()
  const { painting, loading, error } = useSelector(
    (state: PaintingRootState) => state.painting
  )

  const isLoading = loading === 'idle' || loading === 'pending'

  const {
    imgUrl,
    title,
    artist,
    style,
    material,
    technique,
    yearOfCreation,
    height,
    width,
    description,
  } = painting || ({} as IPainting)

  useEffect(() => {
    if (error === 'Painting not found' || isNaN(Number(paintingCardId))) {
      notFound()
    }
  }, [error, paintingCardId])

  useEffect(() => {
    if (paintingCardId) {
      dispatch(fetchPaintingByIdAction(paintingCardId))
    }
  }, [dispatch, paintingCardId])

  /** Price type buttons */
  const isButtonDisabled =
    painting?.priceType === 'Оригинал куплен' ||
    painting?.priceType === 'Оригинал забронирован'

  let buttonLabel = 'КУПИТЬ В ОДИН КЛИК'

  if (
    painting?.priceType === 'Оригинал не продаётся' ||
    painting?.priceType === 'Возможна репродукция'
  ) {
    buttonLabel = 'ЗАКАЗАТЬ РЕПРОДУКЦИЮ'
  }

  return (
    <main className={styles.main}>
      <div className={`container`}>
        <NavigationButton direction='back' label='Назад' />
      </div>
      <article className={`container ${styles.painting_card_container}`}>
        <section />
        <section className={`${styles.image_container} ${styles.section}`}>
          {isLoading ? (
            <Skeleton style={{ width: '100%', height: '100%' }} />
          ) : (
            <Image
              src={imgUrl}
              alt={title}
              width={100}
              height={100}
              className={styles.image}
              unoptimized
            />
          )}
        </section>
        <section className={`${styles.details_container} ${styles.section}`}>
          <header>
            <h1 className={styles.title}>{isLoading ? <Skeleton /> : title}</h1>
          </header>
          <div className={styles.description}>
            <p className={styles.author}>
              {isLoading ? (
                <Skeleton />
              ) : (
                <>
                  <span className={styles.label}>Автор:</span>{' '}
                  {artist?.artistName}
                </>
              )}
            </p>
            <p className={styles.materials}>
              {isLoading ? (
                <Skeleton />
              ) : (
                <>
                  <span className={styles.label}>Материалы:</span> {material},{' '}
                  {technique}
                </>
              )}
            </p>
            <p className={styles.style}>
              {isLoading ? (
                <Skeleton />
              ) : (
                <>
                  <span className={styles.label}>Стиль:</span> {style}
                </>
              )}
            </p>
            <p className={styles.year}>
              {isLoading ? (
                <Skeleton />
              ) : (
                <>
                  <span className={styles.label}>Год:</span> {yearOfCreation}
                </>
              )}
            </p>
            <p className={styles.dimensions}>
              {isLoading ? (
                <Skeleton />
              ) : (
                <>
                  <span className={styles.label}>Размер:</span> {height} x{' '}
                  {width}
                </>
              )}
            </p>
          </div>
          <div className={styles.price_container}>
            {isLoading ? (
              <Skeleton />
            ) : (
              painting && <Price size='large' painting={painting} />
            )}
          </div>
          <footer className={styles.actions}>
            {isLoading ? (
              <Skeleton />
            ) : (
              <DefaultButton
                className={cn('action_button', {})}
                onClick={() => dispatch(actionOpenModal())}
                disabled={isButtonDisabled}
              >
                {buttonLabel}
              </DefaultButton>
            )}
          </footer>
        </section>
        <section className={` ${styles.section}`}>
          {isLoading ? <Skeleton /> : <PageSubTitle text='Описание картины:' />}
          {isLoading ? <Skeleton /> : <PageTextBlock text={description} />}
        </section>
      </article>
    </main>
  )
}
