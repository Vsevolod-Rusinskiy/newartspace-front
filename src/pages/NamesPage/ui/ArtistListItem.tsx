import React from 'react'
import styles from './ArtistListItem.module.scss'

interface IArtistListItem {
  artistName: string
  artistDescription?: string
  imgUrl: string
}

export const ArtistListItem = ({ artistName, imgUrl }: IArtistListItem) => (
  <div className={styles.artist_item}>
    <img src={imgUrl} alt={artistName} className={styles.artist_photo} />
    <p className={styles.artist_name}>{artistName}</p>
  </div>
)
