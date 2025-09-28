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

  const allImages = [
    {
      id: 0,
      imgUrl: mainImage,
      priority: 999,
      title: 'Main',
    },
    ...eventPhotos,
  ]

  const sortedImages = [...allImages].sort((a, b) => b.priority - a.priority)

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
