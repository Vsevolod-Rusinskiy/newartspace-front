'use client'
/* eslint-disable */
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/src/app/model/redux/hooks'
import Skeleton from 'react-loading-skeleton'
import { Alphabet } from '@/src/pages/NamesPage/ui/Alphabet'
import Htag from '@/src/shared/ui/Htag/Htag'
import 'react-loading-skeleton/dist/skeleton.css'
import { fetchArtistsAction } from '../model/namesPageSlice'
import { RootState } from '@/src/app/model/redux/store'
import { ArtistListItem } from './ArtistListItem'
import { Paginate } from '@/src/shared/ui/Pagination/Pagination'
import styles from './NamePage.module.scss'

// interface IArtist {
//   id: string
//   artistName: string
//   artistDescription: string
//   imgUrl: string
// }

// interface ArtistsState {
//   artists: { data: IArtist[]; total: number }
//   loading: 'idle' | 'pending' | 'succeeded' | 'failed'
//   error: string | null | undefined
// }

// interface ArtistsRootState {
//   artists: ArtistsState
// }

export const NamesPage = () => {
  const dispatch = useAppDispatch()
  const { artists, loading, error } = useSelector(
    (state: RootState) => state.artists
  )
  const [page, setPage] = useState(1)
  const [isDelaying, setIsDelaying] = useState(true)

  const limit = 9

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

  return (
    <main className={styles.main}>
      <section className={`container ${styles.content}`}>
        <Htag tag='h1'>Имена художников</Htag>
        <Alphabet />
        <ul className={styles.artists_list}>
          {isLoading || isDelaying
            ? Array.from({ length: 3 }).map((_, index) => (
                <li
                  key={index}
                  className={`${styles.artist_list_item} ${styles.skeleton_list_item}`}
                >
                  <div className={styles.skeleton_container}>
                    <Skeleton className={styles.skeleton_item} />
                  </div>
                </li>
              ))
            : artistArray.map((artist) => (
                <ArtistListItem
                  key={artist.id}
                  id={artist.id}
                  artistName={artist.artistName}
                  imgUrl={artist.imgUrl}
                />
              ))}
        </ul>
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
