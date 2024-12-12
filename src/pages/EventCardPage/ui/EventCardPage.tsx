'use client'

import { useEffect } from 'react'
import { useAppDispatch } from '@/src/app/model/redux/hooks'
import { useSelector } from 'react-redux'
import { notFound } from 'next/navigation'
import Skeleton from 'react-loading-skeleton'
import { fetchEventByIdAction } from '../model/EventCardPageSlice'
import PageTextBlock from '@/src/shared/ui/PageTextBlock/PageTextBlock'
import NavigationButton from '@/src/shared/ui/buttons/NavigationButton/NavigationButton'
import { RootState } from '@/src/app/model/redux/store'
import { IEvent } from '../model/EventCardPageSlice'
import styles from './EventCardPage.module.scss'
import { formatDateForRussia } from '@/src/shared/lib/common'
import Image from 'next/image'

interface EventPageParams {
  params: {
    eventsCardId: string
  }
}

export const EventCardPage = (params: EventPageParams) => {
  const { eventsCardId } = params.params
  const dispatch = useAppDispatch()
  const { event, loading, error } = useSelector(
    (state: RootState) => state.event
  )

  useEffect(() => {
    if (eventsCardId) {
      dispatch(fetchEventByIdAction(eventsCardId))
    }
  }, [dispatch, eventsCardId])

  useEffect(() => {
    if (error === 'Event not found' || isNaN(Number(eventsCardId))) {
      notFound()
    }
  }, [error, eventsCardId])

  const isLoading = loading === 'idle' || loading === 'pending'
  const { title, date, imgUrl, content } = event || ({} as IEvent)

  return (
    <main className={styles.main}>
      <div className={`container`}>
        <NavigationButton direction='back' label='Назад' />
      </div>
      <article className={`container ${styles.event_card_container}`}>
        {isLoading ? (
          <Skeleton style={{ width: '100%', height: '100%' }} />
        ) : (
          <>
            <header>
              <h1 className={styles.title}>{title}</h1>
              <p className={styles.date}>{formatDateForRussia(date)}</p>
            </header>
            <section className={styles.image_container}>
              {imgUrl.endsWith('.mp4') ? (
                <video
                  className={styles.event_img}
                  src={imgUrl}
                  controls
                  crossOrigin='anonymous'
                  width={100}
                  height={100}
                  preload='auto'
                />
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
            </section>
            <div className={styles.description}>
              <PageTextBlock
                text={content}
                className='event_page_description'
              />
            </div>
          </>
        )}
      </article>
    </main>
  )
}
