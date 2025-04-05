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
  watermarkSize?: number
}

export const ImageWithWatermark = ({
  src,
  alt,
  width,
  height,
  className,
  watermarkText = 'www.newartspace.ru',
  unoptimized = false,
  objectFit = 'contain',
  watermarkSize = 24,
}: ImageWithWatermarkProps) => {
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
      <div className={styles.watermark_container}>
        <span className={styles.watermark} style={{ fontSize: watermarkSize }}>
          {watermarkText}
        </span>
      </div>
    </div>
  )
}
