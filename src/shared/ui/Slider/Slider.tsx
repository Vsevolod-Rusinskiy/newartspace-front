import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import Image from 'next/image'
import { Htag } from '../Htag/Htag'
import 'react-alice-carousel/lib/alice-carousel.css'
import styles from './Slider.module.scss'
interface Painting {
  id: number
  imgUrl: string
  title: string
}

interface PaintingSliderProps {
  paintings: Painting[]
}

export const Slider = ({ paintings }: PaintingSliderProps) => {
  const items = paintings.map((painting) => (
    <div key={painting.id} className={styles.slider_item}>
      <Image
        src={painting.imgUrl}
        alt={painting.title}
        width={200}
        height={200}
        className={styles.slider_item_img}
        unoptimized
      />
      <Htag tag='h4'>{painting.title}</Htag>
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
