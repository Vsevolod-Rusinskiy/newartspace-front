'use client'

import { useEffect } from 'react'
import { useAppDispatch } from '@/src/app/model/redux/hooks'
import { useSelector } from 'react-redux'
import { notFound } from 'next/navigation'
import Skeleton from 'react-loading-skeleton'
import { fetchEventByIdAction } from '../model/EventCardPageSlice'
import PageTextBlock from '@/src/shared/ui/PageTextBlock/PageTextBlock'
import NavigationButton from '@/src/shared/ui/buttons/NavigationButton/NavigationButton'
import { DefaultButton } from '@/src/shared/ui/buttons/DefaultButton/DefaultButton'
import styles from './EventCardPage.module.scss'

interface EventPageParams {
  params: {
    eventsCardId: string
  }
}

export const EventCardPage = (params: EventPageParams) => {
  const { eventsCardId } = params.params
  const dispatch = useAppDispatch()
  const { event, loading, error } = useSelector((state) => state.event)

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
              <h1 className={styles.title}>{event.title}</h1>
              <p className={styles.date}>{event.date}</p>
            </header>
            <section className={styles.image_container}>
              {event.imgUrl.endsWith('.mp4') ? (
                <video
                  className={styles.event_img}
                  src={event.imgUrl}
                  controls
                  crossOrigin='anonymous'
                  width={100}
                  height={100}
                  preload='auto'
                />
              ) : (
                <img
                  src={event.imgUrl}
                  alt={event.title}
                  className={styles.event_img}
                />
              )}
            </section>
            <div className={styles.description}>
              <PageTextBlock text={event.content} />
            </div>
            <footer className={styles.actions}>
              <DefaultButton
                onClick={() => {
                  /* handle action */
                }}
              >
                ПОДРОБНЕЕ . . .
              </DefaultButton>
            </footer>
          </>
        )}
      </article>
    </main>
  )
}
