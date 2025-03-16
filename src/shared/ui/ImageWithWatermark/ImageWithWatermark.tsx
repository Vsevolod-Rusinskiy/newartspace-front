'use client'

import Image from 'next/image'
import styles from './ImageWithWatermark.module.scss'
import cn from 'classnames'

interface ImageWithWatermarkProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  watermarkText?: string
  unoptimized?: boolean
  objectFit?: 'contain' | 'cover'
}

export const ImageWithWatermark = ({
  src,
  alt,
  width,
  height,
  className,
  watermarkText = 'newartspace.ru',
  unoptimized = false,
  objectFit = 'contain',
}: ImageWithWatermarkProps) => {
  // Создаем массив для множественных водяных знаков
  const watermarks = Array.from({ length: 20 }, (_, i) => (
    <span key={i} className={styles.watermark}>
      {watermarkText}
    </span>
  ))

  return (
    <div className={styles.image_container}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(styles.image, className)}
        unoptimized={unoptimized}
        style={{ objectFit }}
      />
      <div className={styles.watermark_container}>{watermarks}</div>
    </div>
  )
}
