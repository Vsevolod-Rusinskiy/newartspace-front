'use client'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchPaintingById } from '@/lib/features/painting/paintingCardItemSlice'
import { IPainting, PaintingRootState } from '@/types/painting'
import OrderOneClickButton from '@/components/elements/Buttons/OrderOneClickButton'
import { formatNumberWithSpaces } from '@/lib/utils/common'
import styles from '@/styles/paintingCard/paintingCard.module.scss'

interface PaintingCardItemParams {
  params: {
    paintingCardId: string
  }
}

const PaintingCardItem = (params: PaintingCardItemParams) => {
  const { paintingCardId } = params.params
  const dispatch = useDispatch()
  const { painting, loading, error } = useSelector(
    (state: PaintingRootState) => state.painting
  )

  const {
    paintingUrl,
    name,
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

  useEffect(() => {
    if (loading === 'pending') {
      console.log('Paintings loaded:', painting)
    }
    if (loading === 'failed') {
      console.error('Error loading paintings:', error)
    }
  }, [loading, painting, error])

  if (loading === 'pending') return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <main className={styles.main}>
      <article className={`container ${styles.painting_card_container}`}>
        <section className={`${styles.image_container} ${styles.section}`}>
          {/*{paintingUrl && (*/}
          <Image
            src={paintingUrl}
            alt={name}
            width={100}
            height={100}
            className={styles.image}
          />
          {/* )}*/}
        </section>
        <section className={`${styles.details_container} ${styles.section}`}>
          <header>
            <h1 className={styles.title}>{name}</h1>
          </header>
          <div className={styles.description}>
            <p className={styles.author}>Автор: {author}</p>
            <p className={styles.materials}>Материалы: {materials}</p>
            <p className={styles.style}>Стиль: {style}</p>
            <p className={styles.year}>Год: {yearOfCreation}</p>
            <p className={styles.dimensions}>
              Размер: {height} x {width}
            </p>
          </div>
          <div className={styles.price_container}>
            <p className={styles.price}>{formatNumberWithSpaces(price)} ₽</p>
          </div>
          <footer className={styles.actions}>
            <OrderOneClickButton label='ЗАКАЗАТЬ В ОДИН КЛИК' />
          </footer>
        </section>
      </article>
    </main>
  )
}

export default PaintingCardItem
