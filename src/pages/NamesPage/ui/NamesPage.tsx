'use client'
/* eslint-disable */
import { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/src/app/model/redux/hooks'
import Skeleton from 'react-loading-skeleton'
import { Alphabet } from '@/src/pages/NamesPage/ui/Alphabet'
import { Htag } from '@/src/shared/ui/Htag/Htag'
import { NoData } from '@/src/shared/ui/NoData/NoData'
import 'react-loading-skeleton/dist/skeleton.css'
import {
  fetchArtistsAction,
  updateNamesPageData,
} from '../model/namesPageSlice'
import { RootState } from '@/src/app/model/redux/store'
import { Paginate } from '@/src/shared/ui/Pagination/Pagination'
import { Slider } from '@/src/shared/ui/Slider/Slider'
import { generateUniqueId } from '@/src/shared/utils/generateUniqueId'
import Link from 'next/link'
import styles from './NamePage.module.scss'
import { InfiniteScrollTrigger } from '@/src/shared/ui/InfiniteScrollTrigger/InfiniteScrollTrigger'
import { useLang } from '@/src/shared/hooks/useLang'
import { IArtist } from '@/src/shared/api/artists'
import { slugify } from '@/src/shared/lib/slugify'

interface NamesPageProps {
  initialData?: {
    data: IArtist[]
    total: number
  }
}

export const NamesPage = ({ initialData }: NamesPageProps) => {
  const dispatch = useAppDispatch()
  const { artists, loading, error } = useSelector(
    (state: RootState) => state.artists
  )
  const { lang, translations } = useLang()

  const [page, setPage] = useState(1)
  const [isDelaying, setIsDelaying] = useState(true)
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)

  const limit = 8
  const totalPages = Math.ceil(artists.total / limit)
  const isLastPage = page >= totalPages

  const onLoadNextPage = useCallback(() => {
    if (isLastPage || loading === 'pending') {
      return
    }

    const nextPage = page + 1
    setPage(nextPage)

    dispatch(
      fetchArtistsAction({
        page: nextPage,
        limit,
        letter: selectedLetter || undefined,
      })
    )
  }, [isLastPage, page, loading, dispatch, limit, selectedLetter])

  useEffect(() => {
    dispatch(
      fetchArtistsAction({
        page: 1,
        limit,
        letter: selectedLetter || undefined,
      })
    )
  }, [dispatch, selectedLetter])

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(letter)
    setPage(1)
  }

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

  // Инициализация redux-store начальными данными с сервера
  useEffect(() => {
    if (
      initialData &&
      artists.data.length === 0 &&
      initialData.data.length > 0 &&
      !selectedLetter // Только если не выбрана буква
    ) {
      dispatch(updateNamesPageData(initialData.data))
    }
  }, [initialData, artists.data.length, dispatch, selectedLetter])

  const isLoading = loading === 'idle' || loading === 'pending'

  return (
    <main className={styles.main}>
      <section className={`container ${styles.content}`}>
        <div className={styles.title_container}>
          <Htag tag='h1'>{translations[lang].page_titles.names}</Htag>
        </div>
        <Alphabet onLetterClick={handleLetterClick} />
        {error ? (
          <NoData />
        ) : (isLoading || isDelaying) && page === 1 ? (
          <div className={styles.slider_container}>
            <ul className={styles.slider_list}>
              {Array.from({ length: 4 }).map((_, index) => (
                <li key={index} className={styles.skeleton_container}>
                  <div className={styles.skeleton_list_item}>
                    <Skeleton className={styles.skeleton_item} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : artists.data.length === 0 ? (
          <NoData />
        ) : (
          <div className={styles.slider_container}>
            <ul className={styles.slider_list}>
              {artists.data.map((artist) => (
                <li className={styles.slider_item} key={generateUniqueId()}>
                  <Link
                    href={`/names/${artist.id}-${slugify(artist.artistName)}`}
                  >
                    <Htag tag='h3'>{artist.artistName}</Htag>
                    <Slider paintings={artist.paintings} />
                  </Link>
                </li>
              ))}
            </ul>
            {loading === 'pending' && page > 1 && (
              <ul className={styles.slider_list}>
                {Array.from({ length: 4 }).map((_, index) => (
                  <li
                    key={`skeleton-${index}`}
                    className={styles.skeleton_container}
                  >
                    <div className={styles.skeleton_list_item}>
                      <Skeleton className={styles.skeleton_item} />
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <InfiniteScrollTrigger
              onTrigger={onLoadNextPage}
              isLoading={loading === 'pending' && page > 1}
              hasMore={!isLastPage && artists.data.length < artists.total}
            />
          </div>
        )}
      </section>
    </main>
  )
}
