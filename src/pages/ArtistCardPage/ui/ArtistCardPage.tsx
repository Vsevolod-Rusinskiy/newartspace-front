/* eslint-disable */
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { useSelector } from 'react-redux'
import { useEffect, useRef, useState, useCallback } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { motion } from 'framer-motion'
import NavigationButton from '@/src/shared/ui/buttons/NavigationButton/NavigationButton'
import { useAppDispatch } from '@/src/app/model/redux/hooks'
import {
  fetchArtistByIdAction,
  setArtistData,
} from '../model/artistCardPageSlice'
import PageTextBlock from '@/src/shared/ui/PageTextBlock/PageTextBlock'
import { Htag } from '@/src/shared/ui/Htag/Htag'
import { PaintingListItem } from '@/src/shared/ui/PaintingListItem/PaintingListItem'
import { DefaultButton } from '@/src/shared/ui/buttons/DefaultButton/DefaultButton'
import { IPainting } from '@/src/entities/Painting'
import cn from 'classnames'
import 'react-alice-carousel/lib/alice-carousel.css'
import styles from './ArtistCardPage.module.scss'
import { useLang } from '@/src/shared/hooks/useLang'
import { InfiniteScrollTrigger } from '@/src/shared/ui/InfiniteScrollTrigger/InfiniteScrollTrigger'
import Head from 'next/head'

interface ArtistPageParams {
  params: {
    artistCardId: string
  }
  initialData?: IArtist
}

export interface IArtist {
  id: string
  artistName: string
  artistDescription: string
  imgUrl: string
  paintings: IPainting[]
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

export const ArtistCardPage = (params: ArtistPageParams) => {
  const { artistCardId } = params.params
  const { initialData } = params
  const dispatch = useAppDispatch()
  const { artist, loading, error } = useSelector(
    (state: ArtistRootState) => state.artist
  )
  const [isExpanded, setIsExpanded] = useState(false)
  const [descriptionBlockMaxHeight, setDescriptionBlockMaxHeight] =
    useState(400)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState(1)
  const [displayedPaintings, setDisplayedPaintings] = useState<IPainting[]>([])
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const { lang, translations } = useLang()

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

    if (isExpanded) {
      titleRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }
  const shouldShowButton =
    (artistDescription?.length || 0) > maxDescriptionLength

  useEffect(() => {
    if (error === 'Artist not found' || isNaN(Number(artistCardId))) {
      notFound()
    }
  }, [error, artistCardId])

  useEffect(() => {
    if (initialData) {
      dispatch(setArtistData(initialData))
    } else if (artistCardId) {
      dispatch(fetchArtistByIdAction(artistCardId))
    }
  }, [dispatch, initialData, artistCardId])

  // Обновляем отображаемые картины при изменении художника или страницы
  useEffect(() => {
    if (artist && artist.paintings) {
      // Сортировка по приоритету (по убыванию)
      const sortedPaintings = [...artist.paintings].sort(
        (a, b) => b.priority - a.priority
      )
      const newPaintings = sortedPaintings.slice(0, page * limit)
      setDisplayedPaintings(newPaintings)
      setIsLoadingMore(false)
    }
  }, [artist, page])

  // Функция для загрузки следующей страницы картин
  const loadMorePaintings = useCallback(() => {
    if (artist && artist.paintings) {
      const totalItems = artist.paintings.length
      const totalPages = Math.ceil(totalItems / limit)

      if (page < totalPages) {
        setIsLoadingMore(true)
        setPage((prevPage) => prevPage + 1)
      }
    }
  }, [artist, page])

  // Определяем, есть ли еще картины для загрузки
  const hasMorePaintings =
    artist && artist.paintings
      ? displayedPaintings.length < artist.paintings.length
      : false

  return (
    <main className={styles.main}>
      {artist && !isLoading && (
        <Head>
          <title>{`${artistName} | Галерея молодых и малоизвестных художников`}</title>
          <meta
            name='description'
            content={
              artistDescription
                ? artistDescription.substring(0, 160) + '...'
                : `Ознакомьтесь с работами художника ${artistName} в нашей галерее.`
            }
          />
        </Head>
      )}
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
            <h1 ref={titleRef} className={styles.title}>
              {isLoading ? <Skeleton /> : artistName}
            </h1>
          </header>
          <div className={styles.description}>
            {isLoading ? (
              <Skeleton />
            ) : (
              <motion.div
                initial={{ maxHeight: 400 }}
                animate={{
                  maxHeight: descriptionBlockMaxHeight,
                  opacity: isExpanded ? 1 : 0.99,
                }}
                transition={{
                  duration: 1,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className={styles.description_text}
              >
                <PageTextBlock ref={descriptionRef} text={artistDescription} />
              </motion.div>
            )}
          </div>
          <footer className={styles.actions}>
            {isLoading ? (
              <Skeleton />
            ) : (
              shouldShowButton && (
                <DefaultButton
                  className={cn('action_button', {})}
                  onClick={handleToggle}
                >
                  {isExpanded
                    ? translations[lang].common.collapse
                    : translations[lang].common.show_more}
                </DefaultButton>
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
                {translations[lang].artist_page.more_works}
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
            : displayedPaintings.map((painting) => (
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
                  material={painting.material}
                  technique={painting.technique}
                  height={painting.height}
                  width={painting.width}
                  priceType={painting.priceType}
                  discount={painting.discount}
                />
              ))}

          {isLoadingMore &&
            Array.from({ length: limit }).map((_, index) => (
              <li
                key={`skeleton-${index}`}
                className={`${styles.skeleton_list_item}`}
              >
                <div className={styles.skeleton_container}>
                  <Skeleton className={styles.skeleton_item} />
                </div>
              </li>
            ))}
        </ul>

        {artist && artist.paintings && artist.paintings.length > 0 && (
          <InfiniteScrollTrigger
            onTrigger={loadMorePaintings}
            isLoading={isLoadingMore}
            hasMore={hasMorePaintings}
          />
        )}
      </section>
    </main>
  )
}
