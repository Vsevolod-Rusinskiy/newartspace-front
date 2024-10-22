/* eslint-disable */
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
import { Htag } from '@/src/shared/ui/Htag/Htag'
import { PaintingListItem } from '@/src/shared/ui/PaintingListItem/PaintingListItem'
import { Paginate } from '@/src/shared/ui/Pagination/Pagination'
import styles from './ArtistCardPage.module.scss'
import 'react-alice-carousel/lib/alice-carousel.css'

interface Painting {
  id: string
  author: string
  imgUrl: string
  title: string
  artType: string
  price: number
  theme: string
  style: string
  materials: string
  height: number
  width: number
  yearOfCreation: number
  format: string
  color: string
}

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
  paintings: Painting[]
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
const limit = 3

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
  const [page, setPage] = useState(1)

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

  const handlePageClick = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1)
  }

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const currentPaintings = artist?.paintings.slice(startIndex, endIndex) || []

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
      <section className={`container ${styles.content}`}>
        <div className={styles.content_header}>
          {isLoading ? (
            <Skeleton
              className={`${styles.catalog_title} ${styles.skeleton_catalog_title}`}
            />
          ) : (
            <>
              <div className={styles.separator}></div>
              <Htag tag='h1' className={styles.catalog_title}>
                Еще работы художника
              </Htag>
              <div className={styles.separator}></div>
            </>
          )}
        </div>

        <ul className={styles.painting_list}>
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <li key={index} className={` ${styles.skeleton_list_item}`}>
                  <div className={styles.skeleton_container}>
                    <Skeleton className={styles.skeleton_item} />
                  </div>
                </li>
              ))
            : currentPaintings.map((painting) => (
                <PaintingListItem
                  key={painting.id}
                  id={painting.id}
                  src={painting.imgUrl}
                  alt={painting.title}
                  price={painting.price}
                  author={painting.author}
                  title={painting.title}
                  yearOfCreation={painting.yearOfCreation}
                  style={painting.style}
                  materials={painting.materials}
                  height={painting.height}
                  width={painting.width}
                />
              ))}
        </ul>
        {artist && artist.paintings && artist.paintings.length > 0 && (
          <Paginate
            pageCount={Math.ceil(artist.paintings.length / limit)}
            onPageChange={handlePageClick}
            forcePage={page - 1}
          />
        )}
      </section>
    </main>
  )
}
