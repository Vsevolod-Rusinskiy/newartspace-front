import React from 'react'
import styles from './EventListItem.module.scss'

interface IEventListItem {
  id: number
  title: string
  date: string
  content: string
  imgUrl: string
}

export const EventListItem = ({
  title,
  date,
  content,
  imgUrl,
}: IEventListItem) => (
  <li className={styles.event_item}>
    <h2 className={styles.event_title}>{title}</h2>
    <p className={styles.event_date}>{date}</p>
    <img src={imgUrl} alt={title} className={styles.event_img} />
    <p className={styles.event_content}>{content}</p>
  </li>
)
