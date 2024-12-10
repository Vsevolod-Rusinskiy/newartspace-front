import { formatDateForRussia } from '@/src/shared/lib/common'
import PageTextBlock from '@/src/shared/ui/PageTextBlock/PageTextBlock'
import { DefaultButton } from '@/src/shared/ui/buttons/DefaultButton/DefaultButton'
import cn from 'classnames'
import styles from './EventListItem.module.scss'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

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
  const [poster, setPoster] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (isVideo && videoRef.current && canvasRef.current) {
      videoRef.current.addEventListener('loadeddata', () => {
        videoRef.current.currentTime = 1 // Установите время, с которого хотите взять кадр
      })

      videoRef.current.addEventListener('seeked', () => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        if (context) {
          context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
          setPoster(canvas.toDataURL('image/png')) // Получаем изображение из canvas
        }
      })
    }
  }, [isVideo])

  return (
    <li className={styles.event_item}>
      <h2 className={styles.event_title}>{title}</h2>
      <p className={styles.event_date}>{formatDateForRussia(date)}</p>
      {isVideo ? (
        <>
          <video
            ref={videoRef}
            style={{ display: 'none' }}
            src={imgUrl}
            crossOrigin='anonymous'
          />
          <canvas
            ref={canvasRef}
            width={100}
            height={100}
            style={{ display: 'none' }}
          />
          {poster ? (
            <Image
              src={poster}
              alt={title}
              className={styles.event_img}
              width={100}
              height={100}
              unoptimized
            />
          ) : (
            <div>Загрузка обложки...</div>
          )}
        </>
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
