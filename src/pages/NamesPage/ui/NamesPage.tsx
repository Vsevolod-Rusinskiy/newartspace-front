'use client'
/* eslint-disable */
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/src/app/model/redux/hooks'
import Skeleton from 'react-loading-skeleton'
import { Alphabet } from '@/src/pages/NamesPage/ui/Alphabet'
import { Htag } from '@/src/shared/ui/Htag/Htag'
import 'react-loading-skeleton/dist/skeleton.css'
import { fetchArtistsAction } from '../model/namesPageSlice'
import { RootState } from '@/src/app/model/redux/store'
import { Paginate } from '@/src/shared/ui/Pagination/Pagination'
import { Slider } from '@/src/shared/ui/Slider/Slider'
import { generateUniqueId } from '@/src/shared/utils/generateUniqueId'
import Link from 'next/link'
import styles from './NamePage.module.scss'

export const NamesPage = () => {
  const dispatch = useAppDispatch()
  const { artists, loading, error } = useSelector(
    (state: RootState) => state.artists
  )

  const [page, setPage] = useState(1)
  const [isDelaying, setIsDelaying] = useState(true)

  const limit = 8

  useEffect(() => {
    dispatch(fetchArtistsAction({ page, limit }))
  }, [dispatch, page])

  const handlePageClick = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1)
  }

  const artistArray = Array.isArray(artists.data) ? artists.data : []

  useEffect(() => {
    if (loading === 'succeeded') {
      const timer = setTimeout(() => {
        setIsDelaying(false)
      }, 300)
      return () => clearTimeout(timer)
    } else if (loading === 'pending') {
      setIsDelaying(true)
    }
    if (loading === 'failed') {
      console.error('Error loading artists:', error)
    }
  }, [loading, artists, error])

  const isLoading = loading === 'idle' || loading === 'pending'

  if (error) return <div>Error: {error}</div>

  const handleLetterClick = (letter: string) => {
    dispatch(fetchArtistsAction({ page: 1, limit, letter }))
  }

  return (
    <main className={styles.main}>
      <section className={`container ${styles.content}`}>
        <Htag tag='h1'>Имена художников</Htag>
        <Alphabet onLetterClick={handleLetterClick} />
        <div className={styles.slider_container}>
          <ul className={styles.slider_list}>
            {isLoading || isDelaying
              ? Array.from({ length: 4 }).map((_, index) => (
                  <li key={index} className={styles.skeleton_container}>
                    <div className={styles.skeleton_list_item}>
                      <Skeleton className={styles.skeleton_item} />
                    </div>
                  </li>
                ))
              : artistArray.map((artist) => (
                  <li className={styles.slider_item} key={generateUniqueId()}>
                    <Link href={`/names/${artist.id}`}>
                      <Htag tag='h3'>{artist.artistName}</Htag>
                      <Slider paintings={artist.paintings} />
                    </Link>
                  </li>
                ))}
          </ul>
        </div>

        {artists.data.length > 0 && (
          <Paginate
            pageCount={Math.ceil(artists.total / limit)}
            onPageChange={handlePageClick}
            forcePage={page - 1}
          />
        )}
      </section>
    </main>
  )
}
