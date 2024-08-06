'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import cn from 'classnames'
import { formatNumberWithSpaces } from '@/src/shared/lib/common'
import styles from './HomePage.module.scss'

export interface IPaintingListItem {
  id: string
  src: string
  alt: string
  author: string
  title: string
  price: number
  yearOfCreation: number
  style: string
  materials: string
  height: number
  width: number
}

export const PaintingListItem = ({
  id,
  src,
  alt,
  author,
  title,
  price,
  yearOfCreation,
  style,
  materials,
  height,
  width,
}: IPaintingListItem) => {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <li
      className={styles.painting_list_item}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.painting_list_item_img_container}>
        <Image
          src={src}
          alt={alt}
          width={100}
          height={100}
          className={styles.painting_list_item_img}
          unoptimized
        />
        <Link href={`/${id}`}>
          <div
            className={cn(styles.painting_info_container, {
              [styles.price_container_visible]: isHovered,
            })}
          >
            <p className={styles.author}>{author}</p>
            <p className={styles.name}>{title}</p>
            <p className={styles.size}>
              {height} x {width}
            </p>
            <p className={styles.base_materials}>
              {style}, {materials}
            </p>
            <p className={styles.year}>{yearOfCreation} год</p>
            <p className={styles.price}>{formatNumberWithSpaces(price)} ₽</p>
          </div>
        </Link>
      </div>
    </li>
  )
}
