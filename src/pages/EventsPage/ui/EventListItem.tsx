import { formatDateForRussia } from '@/src/shared/lib/common'
import PageTextBlock from '@/src/shared/ui/PageTextBlock/PageTextBlock'
import { DefaultButton } from '@/src/shared/ui/buttons/DefaultButton/DefaultButton'
import cn from 'classnames'
import styles from './EventListItem.module.scss'
import Image from 'next/image'

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
}: IEventListItem) => {
  const maxDescriptionLength = 210
  const isVideo = imgUrl.endsWith('.mp4')

  return (
    <li className={styles.event_item}>
      <h2 className={styles.event_title}>{title}</h2>
      <p className={styles.event_date}>{formatDateForRussia(date)}</p>
      {isVideo ? (
        <video
          className={styles.event_img}
          controls
          poster={imgUrl.replace('.mp4', '.png')}
        >
          <source src={imgUrl} type='video/mp4' />
          Ваш браузер не поддерживает видео.
        </video>
      ) : (
        <Image
          src={imgUrl}
          alt={title}
          className={styles.event_img}
          width={100}
          height={100}
          unoptimized
        />
      )}
      <PageTextBlock
        text={
          content.length > maxDescriptionLength
            ? content.slice(0, maxDescriptionLength) + '. . .'
            : content
        }
        className={styles.event_content}
      />
      <DefaultButton className={cn('action_button', styles.event_button)}>
        ПОДРОБНЕЕ . . .
      </DefaultButton>
    </li>
  )
}
