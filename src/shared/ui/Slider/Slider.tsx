import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import Image from 'next/image'

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
    <li key={painting.id} className='slider-item'>
      <Image
        src={painting.imgUrl}
        alt={painting.title}
        width={200}
        height={200}
        unoptimized
      />
      <h4>{painting.title}</h4>
    </li>
  ))

  return (
    <AliceCarousel
      mouseTracking
      items={items}
      autoPlay
      autoPlayInterval={3000}
      infinite
      disableButtonsControls
    />
  )
}
