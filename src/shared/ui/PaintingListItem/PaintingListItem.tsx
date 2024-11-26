'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import cn from 'classnames'
import styles from './PaintingListItem.module.scss'
import { Price } from '../Price/Price'

export interface IPaintingListItem {
  id: string
  src: string
  alt: string
  author: string
  title: string
  price: number
  yearOfCreation: number
  style: string
  material: string
  technique: string
  height: number
  width: number
}

export const PaintingListItem = ({
  id,
  src,
  alt,
  author,
  title,
  yearOfCreation,
  material,
  technique,
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
              {material}, {technique}
            </p>
            <p className={styles.year}>{yearOfCreation} год</p>
            <Price />
          </div>
        </Link>
      </div>
    </li>
  )
}
