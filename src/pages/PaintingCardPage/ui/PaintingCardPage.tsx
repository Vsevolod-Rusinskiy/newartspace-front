import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import { fetchPaintingById } from '../model/paintingCardItemSlice'
import OrderOneClickButton from '@/src/shared/ui/buttons/OrderButton'
import { formatNumberWithSpaces } from '@/src/shared/lib/common'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from './PaintingCard.module.scss'

interface PaintingCardItemParams {
  params: {
    paintingCardId: string
  }
}
export interface IPainting {
  id: string
  author: string
  paintingUrl: string
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
  const dispatch = useDispatch()
  const { painting, loading } = useSelector(
    (state: PaintingRootState) => state.painting
  )

  const isLoading = loading === 'idle' || loading === 'pending'

  const {
    paintingUrl,
    title,
    author,
    materials,
    style,
    yearOfCreation,
    height,
    width,
    price,
  } = painting || ({} as IPainting)

  useEffect(() => {
    if (paintingCardId) {
      // @ts-ignore
      dispatch(fetchPaintingById(paintingCardId))
    }
  }, [dispatch, paintingCardId])

  return (
    <main className={styles.main}>
      <article className={`container ${styles.painting_card_container}`}>
        <section className={`${styles.image_container} ${styles.section}`}>
          {isLoading ? (
            <Skeleton style={{ width: '100%', height: '100%' }} />
          ) : (
            <Image
              src={paintingUrl}
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
              {isLoading ? <Skeleton /> : `Автор: ${author}`}
            </p>
            <p className={styles.materials}>
              {isLoading ? <Skeleton /> : `Материалы: ${materials}`}
            </p>
            <p className={styles.style}>
              {isLoading ? <Skeleton /> : `Стиль: ${style}`}
            </p>
            <p className={styles.year}>
              {isLoading ? <Skeleton /> : `Год: ${yearOfCreation}`}
            </p>
            <p className={styles.dimensions}>
              {isLoading ? <Skeleton /> : `Размер: ${height} x ${width}`}
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
              <OrderOneClickButton label='ЗАКАЗАТЬ В ОДИН КЛИК' />
            )}
          </footer>
        </section>
      </article>
    </main>
  )
}
