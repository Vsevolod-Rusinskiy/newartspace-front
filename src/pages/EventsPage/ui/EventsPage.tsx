'use client'
/* eslint-disable */

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/src/app/model/redux/hooks'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { fetchEventsAction } from '../model/eventsPageSlice'
import { RootState } from '@/src/app/model/redux/store'
import { Paginate } from '@/src/shared/ui/Pagination/Pagination'
import { Htag } from '@/src/shared/ui/Htag/Htag'
import { NoData } from '@/src/shared/ui/NoData/NoData'
import styles from './EventsPage.module.scss'
import { EventListItem } from './EventListItem'

export const EventsPage = () => {
  const dispatch = useAppDispatch()
  const { events, loading, error } = useSelector(
    (state: RootState) => state.events
  )
  const [page, setPage] = useState(1)
  const [isDelaying, setIsDelaying] = useState(true)
  const limit = 9

  const handlePageClick = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1)
  }

  useEffect(() => {
    dispatch(fetchEventsAction({ page, limit }))
  }, [dispatch, page])

  const isLoading = loading === 'idle' || loading === 'pending'

  useEffect(() => {
    if (loading === 'succeeded') {
      const timer = setTimeout(() => {
        setIsDelaying(false)
      }, 300)
      return () => clearTimeout(timer)
    } else if (loading === 'pending') {
      setIsDelaying(true)
    }
  }, [loading])

  const eventArray = Array.isArray(events.data) ? events.data : []

  return (
    <main className={styles.main}>
      <section className={`container ${styles.content}`}>
        <div className={styles.title_container}>
          <Htag tag='h1'>События</Htag>
        </div>
        {error ? (
          <NoData />
        ) : isLoading || isDelaying ? (
          <ul className={styles.event_list}>
            {Array.from({ length: 2 }).map((_, index) => (
              <li key={index} className={styles.skeleton_list_item}>
                <div className={styles.skeleton_container}>
                  <Skeleton className={styles.skeleton_item} />
                </div>
              </li>
            ))}
          </ul>
        ) : events.data.length === 0 ? (
          <NoData />
        ) : (
          <ul className={styles.event_list}>
            {eventArray.map((event) => (
              <EventListItem
                key={event.id}
                id={event.id}
                imgUrl={event.imgUrl}
                title={event.title}
                date={event.date}
                content={event.content}
              />
            ))}
          </ul>
        )}
        {events.data.length > 0 && (
          <Paginate
            pageCount={Math.ceil(events.total / limit)}
            onPageChange={handlePageClick}
            forcePage={page - 1}
          />
        )}
      </section>
    </main>
  )
}
