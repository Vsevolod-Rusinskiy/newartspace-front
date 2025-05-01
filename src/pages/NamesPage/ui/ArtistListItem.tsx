import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './ArtistListItem.module.scss'
import { slugify } from '@/src/shared/lib/slugify'

interface IArtistListItem {
  id: string
  artistName: string
  artistDescription?: string
  imgUrl: string
}

export const ArtistListItem = ({ artistName, imgUrl, id }: IArtistListItem) => (
  <Link
    href={`/names/${id}-${slugify(artistName)}`}
    className={styles.artist_link}
  >
    <div className={styles.artist_item}>
      <Image
        src={imgUrl}
        alt={artistName}
        width={100}
        height={100}
        className={styles.artist_photo}
      />
      <p className={styles.artist_name}>{artistName}</p>
    </div>
  </Link>
)
