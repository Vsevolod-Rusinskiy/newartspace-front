import Image from 'next/image'
import { notFound } from 'next/navigation'
import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { motion } from 'framer-motion'

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

const MAX_DESCRIPTION_LENGTH = 1000

export const ArtistCardItem = (params: ArtistPageParams) => {
  const { artistCardId } = params.params
  const dispatch = useAppDispatch()
  const { artist, loading, error } = useSelector(
    (state: ArtistRootState) => state.artist
  )
  const [isExpanded, setIsExpanded] = useState(false)
  const [maxHeight, setMaxHeight] = useState(400)
  const descriptionRef = useRef<HTMLDivElement>(null)

  const isLoading = loading === 'idle' || loading === 'pending'
  const { imgUrl, artistName, artistDescription } = artist || ({} as IArtist)

  /**---->>>>>>> */

  const handleToggle = () => {
    if (descriptionRef.current) {
      setTimeout(() => {
        const fullHeight = descriptionRef.current!.scrollHeight
        console.log('Полная высота текста (scrollHeight):', fullHeight)
        console.log('Текущее состояние isExpanded:', isExpanded)
        console.log('Текущая maxHeight перед изменением:', maxHeight)

        // Устанавливаем корректную высоту в зависимости от состояния
        const newMaxHeight = !isExpanded ? fullHeight : 400
        setMaxHeight(newMaxHeight)

        console.log('Установленная maxHeight после изменения:', newMaxHeight)
      }, 100) // Ждём 100 мс, чтобы контент успел отрендериться
    }

    // Меняем состояние
    setIsExpanded(!isExpanded)
    console.log('Новое состояние isExpanded:', !isExpanded)
  }
  const shouldShowButton =
    (artistDescription?.length || 0) > MAX_DESCRIPTION_LENGTH
  /** <<<<<<<------ */

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
                animate={{ maxHeight: maxHeight }}
                transition={{ duration: 0.5 }}
                className={styles.description_text}
              >
                <PageTextBlock
                  ref={descriptionRef}
                  text={
                    isExpanded
                      ? artistDescription
                      : artistDescription.slice(0, MAX_DESCRIPTION_LENGTH) +
                        '...'
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
