import { formatDateForRussia } from '@/src/shared/lib/common'
import PageTextBlock from '@/src/shared/ui/PageTextBlock/PageTextBlock'
import { DefaultButton } from '@/src/shared/ui/buttons/DefaultButton/DefaultButton'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import styles from './EventListItem.module.scss'
interface IEventListItem {
  id: number
  title: string
  date: string
  content: string
  imgUrl: string
}

export const EventListItem = ({
  id,
  title,
  date,
  content,
  imgUrl,
}: IEventListItem) => {
  const isVideo = imgUrl.endsWith('.mp4')

  return (
    <li className={styles.event_item}>
      <h2 className={styles.event_title}>{title}</h2>
      <p className={styles.event_date}>{formatDateForRussia(date)}</p>
      {isVideo ? (
        <video
          className={cn(styles.event_img, styles.event_video)}
          src={imgUrl}
          controls
          crossOrigin='anonymous'
          width={100}
          height={100}
          preload='auto'
        />
      ) : (
        <>
          <Link href={`/events/${id}`}>
            <Image
              src={imgUrl}
              alt={title}
              className={styles.event_img}
              width={100}
              height={100}
              unoptimized
            />
          </Link>
        </>
      )}
      <PageTextBlock text={content} className={cn(styles.event_content)} />
      <Link href={`/events/${id}`}>
        <DefaultButton className={cn('action_button', styles.event_button)}>
          ПОДРОБНЕЕ . . .
        </DefaultButton>
      </Link>
    </li>
  )
}
