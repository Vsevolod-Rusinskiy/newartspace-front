import React, { useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import Image from 'next/image'
import { formatNumberWithSpaces } from '@/src/shared/lib/common'
import cn from 'classnames'
import 'react-alice-carousel/lib/alice-carousel.css'
import styles from './Slider.module.scss'
interface Painting {
  id: number
  imgUrl: string
  title: string
  author: string
  height: number
  width: number
  style: string
  materials: string
  yearOfCreation: number
  price: number
}

interface PaintingSliderProps {
  paintings: Painting[]
}

export const Slider = ({ paintings }: PaintingSliderProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const items = paintings.map((painting, index) => (
    <div
      key={painting.id}
      className={styles.slider_item}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <Image
        src={painting.imgUrl}
        alt={painting.title}
        width={200}
        height={200}
        className={styles.slider_item_img}
        unoptimized
      />
      <div
        className={cn(styles.painting_info_container, {
          [styles.visible]: hoveredIndex === index,
        })}
      >
        <p className={styles.title}>{painting.title}</p>
        <p className={styles.size}>
          {painting.height} x {painting.width}
        </p>
        <p className={styles.base_materials}>
          {painting.style}, {painting.materials}
        </p>
        <p className={styles.year}>{painting.yearOfCreation} год</p>
        <p className={styles.price}>
          {formatNumberWithSpaces(painting.price)} ₽
        </p>
      </div>
    </div>
  ))

  return (
    <AliceCarousel
      mouseTracking
      items={items}
      autoPlay
      autoPlayInterval={3000}
      infinite
      disableButtonsControls
      disableDotsControls
      autoPlayStrategy='default'
    />
  )
}
