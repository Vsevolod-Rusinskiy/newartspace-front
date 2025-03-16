import React, { useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import cn from 'classnames'
import 'react-alice-carousel/lib/alice-carousel.css'
import styles from './Slider.module.scss'
import { Price } from '../Price/Price'
import { ImageWithWatermark } from '../ImageWithWatermark/ImageWithWatermark'

interface Painting {
  id: number
  imgUrl: string
  title: string
  author: string
  height: number
  width: number
  material: string
  technique: string
  yearOfCreation: number
  price: number
  priceType: string
  discount: number
  priority: number
}

interface PaintingSliderProps {
  paintings: Painting[]
}

export const Slider = ({ paintings }: PaintingSliderProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const sortedPaintings = [...paintings].sort((a, b) => b.priority - a.priority)

  const items = sortedPaintings.map((painting, index) => (
    <div
      key={painting.id}
      className={styles.slider_item}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <ImageWithWatermark
        src={painting.imgUrl}
        alt={painting.title}
        width={230}
        height={220}
        className={styles.slider_item_img}
        unoptimized
        objectFit='cover'
        watermarkSize={16}
      />
      <div
        className={cn(styles.painting_info_container, {
          [styles.visible]: hoveredIndex === index,
        })}
      >
        <p className={styles.title}>{painting.title}</p>
        <p className={styles.size}>
          {painting.height} x {painting.width} см
        </p>
        <p className={styles.base_materials}>
          {painting.material}, {painting.technique}
        </p>
        {/* <p className={styles.year}>{painting.yearOfCreation} год</p> */}
        <Price
          priceType={painting.priceType}
          discount={painting.discount}
          price={painting.price}
          hidePrice={false}
        />
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
