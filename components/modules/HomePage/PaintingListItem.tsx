'use client'
import { useState } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { formatNumberWithSpaces } from '@/lib/utils/common'
import { IPaintingListItem } from '@/types/paintingListItem'
import Image from 'next/image'
import styles from '@/styles/page/page.module.scss'

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

  return (
    <li
      className={styles.painting_list_item}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.painting_list_item_img_container}>
        {/*<img src={src} alt={alt} className={styles.painting_list_item_img} />*/}
        <div className={styles.painting_list_item_img_wrapper}>
          <Image
            src={src}
            alt={alt}
            layout='fill'
            objectFit='contain'
            className={styles.painting_list_item_img}
          />
        </div>
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
