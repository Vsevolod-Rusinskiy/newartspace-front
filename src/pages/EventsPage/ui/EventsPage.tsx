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
import styles from './EventsPage.module.scss'
import { log } from 'console'

export const EventsPage = () => {
  const dispatch = useAppDispatch()
  const { events, loading, error } = useSelector(
    (state: RootState) => state.events
  )
  const [page, setPage] = useState(1)
  const limit = 9

  const handlePageClick = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1)
  }
  console.log(events, 11111)
  useEffect(() => {
    dispatch(fetchEventsAction({ page, limit }))
  }, [dispatch, page])

  const isLoading = loading === 'idle' || loading === 'pending'

  if (error) return <div>Error: {error}</div>

  return (
    <main className={styles.main}>
      <section className={`container ${styles.content}`}>
        <Htag tag='h1'>События</Htag>
        {/* <ul className={styles.event_list}>
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <li key={index} className={`${styles.skeleton_list_item}`}>
                  <div className={styles.skeleton_container}>
                    <Skeleton className={styles.skeleton_item} />
                  </div>
                </li>
              ))
            : events.map((event) => (
                <li key={event.id} className={styles.event_item}>
                  <h2 className={styles.event_title}>{event.title}</h2>
                  <p className={styles.event_date}>{event.date}</p>
                  <p className={styles.event_content}>{event.content}</p>
                </li>
              ))}
        </ul> */}
        {events.length > 0 && (
          <Paginate
            pageCount={Math.ceil(events.length / limit)}
            onPageChange={handlePageClick}
            forcePage={page - 1}
          />
        )}
      </section>
    </main>
  )
}
