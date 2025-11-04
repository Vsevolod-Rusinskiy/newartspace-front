'use client'
import { useEffect } from 'react'
import { useAppDispatch } from '@/src/app/model/redux/hooks'
import { useSelector } from 'react-redux'
import { RootState } from '@/src/app/model/redux/store'
import { fetchRecentlyViewedPaintings } from '../model/recentlyViewedSlice'
import { PaintingListItem } from '@/src/shared/ui/PaintingListItem/PaintingListItem'
import { Htag } from '@/src/shared/ui/Htag/Htag'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useLang } from '@/src/shared/hooks/useLang'
import styles from './RecentlyViewed.module.scss'

interface RecentlyViewedProps {
  currentPaintingId?: number
  limit?: number
}

export const RecentlyViewed = ({
  currentPaintingId,
  limit = 6,
}: RecentlyViewedProps) => {
  const dispatch = useAppDispatch()
  const { lang, translations } = useLang()
  const { viewedPaintings, loading, viewedIds } = useSelector(
    (state: RootState) => state.recentlyViewed
  )

  useEffect(() => {
    // Fetch paintings excluding current one
    if (viewedIds.length > 0) {
      dispatch(fetchRecentlyViewedPaintings(currentPaintingId))
    }
  }, [dispatch, viewedIds.length, currentPaintingId])

  const isLoading = loading === 'idle' || loading === 'pending'
  const displayedPaintings = viewedPaintings.data.slice(0, limit)

  // Don't show section if no viewed paintings or only current painting
  if (viewedIds.length <= 1) {
    return null
  }

  return (
    <section className={`container ${styles.content}`}>
      <div className={styles.content_header}>
        {isLoading ? (
          <Skeleton
            className={`${styles.catalog_title} ${styles.skeleton_catalog_title}`}
          />
        ) : (
          <>
            <div className={styles.separator} />
            <Htag tag='h2' className={styles.catalog_title}>
              {translations[lang].recently_viewed.title}
            </Htag>
            <div className={styles.separator} />
          </>
        )}
      </div>

      <ul className={styles.painting_list}>
        {/* eslint-disable indent, react/jsx-indent */}
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <li key={index} className={styles.skeleton_list_item}>
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
                isAdult={painting.isAdult}
              />
            ))}
        {/* eslint-enable indent, react/jsx-indent */}
      </ul>
    </section>
  )
}
