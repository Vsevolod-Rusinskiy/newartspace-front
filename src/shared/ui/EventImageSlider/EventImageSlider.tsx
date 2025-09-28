import React, { useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import styles from './EventImageSlider.module.scss'
import Image from 'next/image'

interface EventPhoto {
  id: number
  imgUrl: string
  priority: number
  title: string
}

interface EventImageSliderProps {
  mainImage: string
  eventPhotos: EventPhoto[]
  eventTitle: string
}

export const EventImageSlider = ({
  mainImage,
  eventPhotos,
  eventTitle,
}: EventImageSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Combine main image with additional photos
  const allImages = [
    {
      id: 0,
      imgUrl: mainImage,
      priority: 999, // Give main image highest priority
      title: 'Main',
    },
    ...eventPhotos,
  ]

  // Sort by priority (highest first)
  const sortedImages = [...allImages].sort((a, b) => b.priority - a.priority)

  // Debug logs for priority sorting
  console.log('🔍 EventImageSlider Debug:')
  console.log('📷 All images before sort:', allImages)
  console.log('📊 Sorted images:', sortedImages)
  console.log(
    '🔢 Priority order:',
    sortedImages.map((img) => ({ title: img.title, priority: img.priority }))
  )

  const items = sortedImages.map((photo, index) => {
    const isVideo = photo.imgUrl.endsWith('.mp4')

    return (
      <div key={photo.id} className={styles.slider_item}>
        {isVideo ? (
          <video
            className={styles.event_video}
            src={photo.imgUrl}
            controls
            crossOrigin='anonymous'
            width={100}
            height={100}
            preload='auto'
          />
        ) : (
          <Image
            src={photo.imgUrl}
            alt={`${eventTitle} - фото ${index + 1}`}
            className={styles.event_img}
            width={400}
            height={300}
            unoptimized
            objectFit='cover'
          />
        )}
      </div>
    )
  })

  // If only one image, don't render slider
  if (sortedImages.length <= 1) {
    const isVideo = mainImage.endsWith('.mp4')
    return (
      <div className={styles.single_image_container}>
        {isVideo ? (
          <video
            className={styles.event_video}
            src={mainImage}
            controls
            crossOrigin='anonymous'
            width={100}
            height={100}
            preload='auto'
          />
        ) : (
          <Image
            src={mainImage}
            alt={eventTitle}
            className={styles.event_img}
            width={400}
            height={300}
            unoptimized
            objectFit='cover'
          />
        )}
      </div>
    )
  }

  // Custom render functions for navigation (в стиле проекта)
  const renderPrevButton = () => {
    return <span>‹</span>
  }

  const renderNextButton = () => {
    return <span>›</span>
  }

  return (
    <div className={styles.slider_container}>
      <AliceCarousel
        mouseTracking
        items={items}
        autoPlay={false}
        infinite={false}
        disableButtonsControls={false}
        disableDotsControls={true}
        autoPlayStrategy='default'
        renderPrevButton={renderPrevButton}
        renderNextButton={renderNextButton}
        activeIndex={currentSlide}
        onSlideChanged={(e) => setCurrentSlide(e.item)}
        responsive={{
          0: { items: 1 },
          768: { items: 1 },
          1024: { items: 1 },
        }}
      />

      {/* Кастомные dots в стиле проекта */}
      {sortedImages.length > 1 && (
        <div className={styles.custom_dots}>
          {sortedImages.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${currentSlide === index ? styles.active : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
