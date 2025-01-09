import { FC } from 'react'
import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from './HorizontalPaintingCard.module.scss'

interface HorizontalPaintingCardProps {
  id: string
  src: string
  alt: string
  author: string
  title: string
  price: number
  yearOfCreation: number
  style: string
  material: string
  technique: string
  height: number
  width: number
  priceType: string
  discount: number
  isLoading?: boolean
}

export const HorizontalPaintingCard: FC<HorizontalPaintingCardProps> = ({
  src,
  alt,
  author,
  title,
  price,
  yearOfCreation,
  style,
  material,
  height,
  width,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className={styles.skeleton_container}>
        <Skeleton className={styles.skeleton_item} />
      </div>
    )
  }

  return (
    <div className={styles.horizontal_card}>
      <div className={styles.image_container}>
        <Image
          src={src}
          alt={alt}
          width={100}
          height={100}
          className={styles.image}
          unoptimized
        />
      </div>
      <div className={styles.info_container}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.details}>
          <p className={styles.author}>{author}</p>
          <p className={styles.year}>{yearOfCreation}</p>
          <p className={styles.size}>{`${height} × ${width} см`}</p>
          <p className={styles.material}>{material}</p>
          <p className={styles.style}>{style}</p>
        </div>
      </div>
      <div className={styles.price_container}>
        <p className={styles.price}>{`${price} ₽`}</p>
      </div>
    </div>
  )
}
