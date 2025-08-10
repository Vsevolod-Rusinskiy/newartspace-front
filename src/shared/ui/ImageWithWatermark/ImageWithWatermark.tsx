'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import styles from './ImageWithWatermark.module.scss'
import cn from 'classnames'
import { useAppSelector } from '@/src/app/model/redux/hooks'
import { AgeVerificationModal } from '@/src/features/AgeVerification'

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
  isAdult?: boolean
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
  isAdult = false,
}: ImageWithWatermarkProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const ageVerificationState = useAppSelector((state) => state.ageVerification)

  // Safely access state with fallback
  const isAgeVerified = ageVerificationState?.isAgeVerified ?? false
  const isInitialized = ageVerificationState?.isInitialized ?? false

  const showBlur = isAdult && isInitialized && !isAgeVerified && isClient

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleBlurClick = () => {
    if (showBlur) {
      setIsModalOpen(true)
    }
  }

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

      {showBlur && (
        <div className={styles.adult_blur_overlay} onClick={handleBlurClick}>
          <div className={styles.adult_label}>+18</div>
        </div>
      )}

      {isClient && (
        <AgeVerificationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}
