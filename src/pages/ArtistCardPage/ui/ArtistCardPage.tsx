import Image from 'next/image'
import { notFound } from 'next/navigation'
import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { motion } from 'framer-motion'
import NavigationButton from '@/src/shared/ui/buttons/NavigationButton/NavigationButton'
import { useAppDispatch } from '@/src/app/model/redux/hooks'
import { fetchArtistByIdAction } from '../model/artistCardItemSlice'
import { ActionButton } from '@/src/shared/ui/buttons/ActionButton/ActionButton'
import PageTextBlock from '@/src/shared/ui/PageTextBlock/PageTextBlock'
import styles from './ArtistCardPage.module.scss'

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

const maxDescriptionLength = 1000

export const ArtistCardItem = (params: ArtistPageParams) => {
  const { artistCardId } = params.params
  const dispatch = useAppDispatch()
  const { artist, loading, error } = useSelector(
    (state: ArtistRootState) => state.artist
  )
  const [isExpanded, setIsExpanded] = useState(false)
  const [descriptionBlockMaxHeight, setDescriptionBlockMaxHeight] =
    useState(400)
  const descriptionRef = useRef<HTMLDivElement>(null)

  const isLoading = loading === 'idle' || loading === 'pending'
  const { imgUrl, artistName, artistDescription } = artist || ({} as IArtist)

  const handleToggle = () => {
    if (descriptionRef.current) {
      requestAnimationFrame(() => {
        const fullHeight = descriptionRef.current!.scrollHeight
        const newMaxHeight = !isExpanded ? fullHeight : 400
        setDescriptionBlockMaxHeight(newMaxHeight)
      })
    }
    setIsExpanded(!isExpanded)
  }
  const shouldShowButton =
    (artistDescription?.length || 0) > maxDescriptionLength

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

  return (
    <main className={styles.main}>
      <div className={`container`}>
        <NavigationButton direction='back' label='Назад' />
      </div>
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
              <motion.div
                initial={{ maxHeight: 400 }}
                animate={{ maxHeight: descriptionBlockMaxHeight }}
                transition={{ duration: 0.5 }}
                className={styles.description_text}
              >
                <PageTextBlock
                  ref={descriptionRef}
                  text={
                    isExpanded ||
                    artistDescription.length <= maxDescriptionLength
                      ? artistDescription
                      : artistDescription.slice(0, maxDescriptionLength) + '...'
                  }
                />
              </motion.div>
            )}
          </div>
          <footer className={styles.actions}>
            {isLoading ? (
              <Skeleton />
            ) : (
              shouldShowButton && (
                <ActionButton onClick={handleToggle}>
                  {isExpanded ? 'Свернуть' : 'Подробнее'}
                </ActionButton>
              )
            )}
          </footer>
        </section>
      </article>
    </main>
  )
}
