import { formatDateForRussia } from '@/src/shared/lib/common'
import PageTextBlock from '@/src/shared/ui/PageTextBlock/PageTextBlock'
import { DefaultButton } from '@/src/shared/ui/buttons/DefaultButton/DefaultButton'
import { EventImageSlider } from '@/src/shared/ui/EventImageSlider'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import styles from './EventListItem.module.scss'

interface EventPhoto {
  id: number
  imgUrl: string
  priority: number
  title: string
  createdAt: string
  updatedAt: string
  eventId: number
}

interface IEventListItem {
  id: number
  title: string
  date: string
  content: string
  imgUrl: string
  eventPhotos?: EventPhoto[]
}

export const EventListItem = ({
  id,
  title,
  date,
  content,
  imgUrl,
  eventPhotos = [],
}: IEventListItem) => {
  const hasMultipleImages = eventPhotos && eventPhotos.length > 0
  const isVideo = imgUrl.endsWith('.mp4')

  return (
    <li className={styles.event_item}>
      <h2 className={styles.event_title}>{title}</h2>
      <p className={styles.event_date}>{formatDateForRussia(date)}</p>

      <div className={styles.image_container}>
        {hasMultipleImages ? (
          <Link href={`/events/${id}`}>
            <div className={styles.slider_wrapper}>
              <EventImageSlider
                mainImage={imgUrl}
                eventPhotos={eventPhotos}
                eventTitle={title}
              />
            </div>
          </Link>
        ) : (
          <>
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
            )}
          </>
        )}
      </div>

      <PageTextBlock text={content} className={cn(styles.event_content)} />
      <Link href={`/events/${id}`}>
        <DefaultButton className={cn('action_button', styles.event_button)}>
          ПОДРОБНЕЕ . . .
        </DefaultButton>
      </Link>
    </li>
  )
}
