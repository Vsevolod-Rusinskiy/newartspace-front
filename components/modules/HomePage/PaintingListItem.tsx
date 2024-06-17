'use client'
import dotenv from 'dotenv'
import Image from 'next/image'
import cn from 'classnames'
import { useState } from 'react'
import Link from 'next/link'
import { formatNumberWithSpaces } from '@/lib/utils/common'
import { IPaintingListItem } from '@/types/paintingListItem'
import styles from '@/styles/page/page.module.scss'

dotenv.config()

const PaintingListItem = ({
  id,
  src,
  alt,
  author,
  name,
  price,
  yearOfCreation,
  base,
  materials,
  height,
  width,
}: IPaintingListItem) => {
  const [isHovered, setIsHovered] = useState(false)

  const src1 = `${process.env.NEXT_PUBLIC_IMAGE_PROTOCOL}://${process.env.NEXT_PUBLIC_IMAGE_HOST}:${process.env.NEXT_PUBLIC_IMAGE_PORT}`

  return (
    <li
      className={styles.painting_list_item}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.painting_list_item_img_container}>
        <Image
          src={src.replace('http://localhost:3000', src1)}
          alt={alt}
          width={100}
          height={100}
          className={styles.painting_list_item_img}
        />
        <Link href={`/${id}`}>
          <div
            className={cn(styles.painting_info_container, {
              [styles.price_container_visible]: isHovered,
            })}
          >
            <p className={styles.author}>{author}</p>
            <p className={styles.name}>{name}</p>
            <p className={styles.size}>
              {height} x {width}
            </p>
            <p className={styles.base_materials}>
              {base}, {materials}
            </p>
            <p className={styles.year}>{yearOfCreation} год</p>
            <p className={styles.price}>{formatNumberWithSpaces(price)} ₽</p>
          </div>
        </Link>
      </div>
    </li>
  )
}

export default PaintingListItem
