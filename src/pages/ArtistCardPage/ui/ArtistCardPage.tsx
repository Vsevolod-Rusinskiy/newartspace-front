import Image from 'next/image'
import { notFound } from 'next/navigation'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useAppDispatch } from '@/src/app/model/redux/hooks'
import { fetchArtistByIdAction } from '../model/artistCardItemSlice'
import { ActionButton } from '@/src/shared/ui/buttons/ActionButton/ActionButton'
import styles from './ArtistCardPage.module.scss'
import PageTextBlock from '@/src/shared/ui/PageTextBlock/PageTextBlock'

interface ArtistPageParams {
  params: {
    artistCardId: string
  }
}

export interface IArtist {
  id: string
  artistName: string
  artistDescription: string
  imgUrl: string
}

export interface ArtistState {
  artist: IArtist | null
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null | undefined
}

export interface ArtistRootState {
  artist: ArtistState
}

export const ArtistCardItem = (params: ArtistPageParams) => {
  const { artistCardId } = params.params
  const dispatch = useAppDispatch()
  const { artist, loading, error } = useSelector(
    (state: ArtistRootState) => state.artist
  )

  const isLoading = loading === 'idle' || loading === 'pending'

  const { imgUrl, artistName, artistDescription } = artist || ({} as IArtist)

  const [isDescriptionTooLong, setIsDescriptionTooLong] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const getAmountOfSymbolsInDescription = () => {
    if (artistDescription.length > 1800) {
      setIsDescriptionTooLong(true)
    } else {
      setIsDescriptionTooLong(false)
    }
  }

  useEffect(() => {
    if (error === 'Artist not found' || isNaN(Number(artistCardId))) {
      notFound()
    }
  }, [error, artistCardId])

  useEffect(() => {
    if (artistCardId) {
      dispatch(fetchArtistByIdAction(artistCardId))
    }
  }, [dispatch, artistCardId])

  useEffect(() => {
    if (artistDescription) {
      getAmountOfSymbolsInDescription()
    }
  }, [artistDescription])

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <main className={styles.main}>
      <article className={`container ${styles.artist_card_container}`}>
        <section className={`${styles.image_container} ${styles.section}`}>
          {isLoading ? (
            <Skeleton style={{ width: '100%', height: '100%' }} />
          ) : (
            <Image
              src={imgUrl}
              alt={artistName}
              width={100}
              height={100}
              className={styles.image}
              unoptimized
            />
          )}
        </section>
        <section className={`${styles.details_container} ${styles.section}`}>
          <header>
            <h1 className={styles.title}>
              {isLoading ? <Skeleton /> : artistName}
            </h1>
          </header>
          <div className={styles.description}>
            {isLoading ? (
              <Skeleton />
            ) : (
              <PageTextBlock
                text={
                  isDescriptionTooLong && !isExpanded
                    ? artistDescription.slice(0, 1800) + '...'
                    : artistDescription
                }
              />
            )}
          </div>
          <footer className={styles.actions}>
            {isLoading ? (
              <Skeleton />
            ) : (
              <ActionButton
                onClick={toggleExpand}
                isVisible={isDescriptionTooLong}
              >
                {isExpanded ? 'Свернуть' : 'Подробнее'}
              </ActionButton>
            )}
          </footer>
        </section>
      </article>
    </main>
  )
}
