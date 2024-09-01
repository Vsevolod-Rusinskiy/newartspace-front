import Image from 'next/image'
import { notFound } from 'next/navigation'
import { useAppDispatch } from '@/src/app/model/redux/hooks'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import { fetchPaintingByIdAction } from '../model/paintingCardItemSlice'
import OrderOneClickButton from '@/src/shared/ui/buttons/OrderButton/OrderButton'
import { formatNumberWithSpaces } from '@/src/shared/lib/common'
import PageSubTitle from '@/src/shared/ui/PageSubTitle/PageSubTitle'
import PageTextBlock from '@/src/shared/ui/PageTextBlock/PageTextBlock'
import NavigationButton from '@/src/shared/ui/buttons/NavigationButton/NavigationButton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from './PaintingCardPage.module.scss'

interface PaintingCardItemParams {
  params: {
    paintingCardId: string
  }
}

export interface IPainting {
  id: string
  author: string
  imgUrl: string
  title: string
  artType: string
  price: number
  theme: string
  style: string
  materials: string
  height: number
  width: number
  yearOfCreation: number
  format: string
  color: string
  description: string
}

export interface PaintingState {
  painting: IPainting | null
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
    author,
    materials,
    style,
    yearOfCreation,
    height,
    width,
    price,
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
                  <span className={styles.label}>Автор:</span> {author}
                </>
              )}
            </p>
            <p className={styles.materials}>
              {isLoading ? (
                <Skeleton />
              ) : (
                <>
                  <span className={styles.label}>Материалы:</span> {materials}
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
              <p className={styles.price}>{formatNumberWithSpaces(price)} ₽</p>
            )}
          </div>
          <footer className={styles.actions}>
            {isLoading ? (
              <Skeleton />
            ) : (
              <OrderOneClickButton>Заказать в один клик </OrderOneClickButton>
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
