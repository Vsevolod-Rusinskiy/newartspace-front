'use client'
/* eslint-disable */
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/src/app/model/redux/hooks'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { fetchPaintingsAction, setArtStyle } from '../model/homePageSlice'
import { RootState } from '@/src/app/model/redux/store'
import { PaintingListItem } from '@/src/shared/ui/PaintingListItem/PaintingListItem'
import { Htag } from '@/src/shared/ui/Htag/Htag'
import { HomePageButton } from '@/src/shared/ui/buttons/HomePageButton/HomePageButton'
import { DefaultButton } from '@/src/shared/ui/buttons/DefaultButton/DefaultButton'
import { actionToggleSideBar } from '../model/sideBarVisibilitySlice'
import { actionToggleSortSideBar } from '@/src/widgets/SortSidebar/model/sortSideBarVisibilitySlice'
import { FilterBadge } from '@/src/shared/ui/FilterBadge/FilterBadge'
import styles from './HomePage.module.scss'
import cn from 'classnames'
import { selectSelectedFilters } from '@/src/widgets/Sidebar/model/selectors'
import { getSortParams } from '@/src/widgets/SortSidebar/model/types'
import { NoData } from '@/src/shared/ui/NoData/NoData'
import { InfiniteScrollTrigger } from '@/src/shared/ui/InfiniteScrollTrigger/InfiniteScrollTrigger'
import { useLang } from '@/src/shared/hooks/useLang'

export const HomePage = () => {
  const dispatch = useAppDispatch()
  const { paintings, loading, error, artStyle } = useSelector(
    (state: RootState) => state.paintings
  )
  const [page, setPage] = useState(1)
  const [isDelaying, setIsDelaying] = useState(true)
  const [selectedArtStyle, setSelectedArtStyle] = useState<string | null>(
    artStyle
  )
  const { lang, translations } = useLang()

  const limit = 9
  const totalPages = Math.ceil(paintings.total / limit)
  const isLastPage = page >= totalPages

  const selectedFilters = useSelector(selectSelectedFilters)
  const sortType = useSelector((state: RootState) => state.sort.sortType)

  // Используем эту же функцию в кнопках фильтров и сортировки
  const handleFilterClick = () => {
    dispatch(actionToggleSideBar())
  }

  const handleSortClick = () => {
    dispatch(actionToggleSortSideBar())
  }

  const handleApplyFilters = useCallback(() => {
    setPage(1)
    dispatch(
      fetchPaintingsAction({
        page: 1,
        limit,
        artStyle,
        filters: selectedFilters,
        sort: getSortParams(sortType),
      })
    )
  }, [dispatch, limit, artStyle, selectedFilters, sortType])

  useEffect(() => {
    handleApplyFilters()
  }, [artStyle, handleApplyFilters])

  const onLoadNextPage = useCallback(() => {
    if (isLastPage || loading === 'pending') {
      return
    }

    const nextPage = page + 1
    setPage(nextPage)

    dispatch(
      fetchPaintingsAction({
        page: nextPage,
        limit,
        artStyle,
        filters: selectedFilters,
        sort: getSortParams(sortType),
      })
    )
  }, [
    isLastPage,
    page,
    loading,
    dispatch,
    limit,
    artStyle,
    selectedFilters,
    sortType,
  ])

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
      console.error('Error loading paintings:', error)
    }
  }, [loading, paintings, error])

  const isLoading = loading === 'idle' || loading === 'pending'

  const handleArtStyleChange = (style: string) => {
    dispatch(setArtStyle(style))
    dispatch(
      fetchPaintingsAction({
        page: 1,
        limit,
        artStyle: style,
        filters: selectedFilters,
        sort: getSortParams(sortType),
      })
    )
    setSelectedArtStyle(style)
  }

  return (
    <main className={styles.main}>
      <section className={`container ${styles.content}`}>
        {!selectedArtStyle ? (
          <Htag tag='h1' className={styles.catalog_title}>
            {translations[lang].page_titles.catalog}
          </Htag>
        ) : (
          <div className={styles.content_header}>
            <DefaultButton
              onClick={handleFilterClick}
              className={cn(styles.filter_button, 'filter_button')}
            >
              {translations[lang].catalog_page.filters}
              <FilterBadge
                isVisible={Object.keys(selectedFilters).length > 0}
              />
            </DefaultButton>
            <Htag tag='h1' className={styles.catalog_title_filters}>
              {translations[lang].page_titles.catalog}
            </Htag>
            <DefaultButton
              onClick={handleSortClick}
              className={cn(styles.sort_button, 'sort_button')}
            >
              {translations[lang].catalog_page.sorting}
            </DefaultButton>
          </div>
        )}
        <div className={styles.button_container}>
          <HomePageButton
            className={cn('shadow_button', 'wide_button', {
              active: selectedArtStyle === 'Современность',
              shrink: selectedArtStyle || artStyle !== null,
            })}
            onClick={() => handleArtStyleChange('Современность')}
          >
            <span>{translations[lang].catalog_page.art_styles.modern}</span>
          </HomePageButton>
          <HomePageButton
            className={cn('shadow_button', 'wide_button', {
              active: selectedArtStyle === 'Традиции',
              shrink: selectedArtStyle || artStyle !== null,
            })}
            onClick={() => handleArtStyleChange('Традиции')}
          >
            <span>
              {translations[lang].catalog_page.art_styles.traditional}
            </span>
          </HomePageButton>
        </div>

        {selectedArtStyle && (
          <>
            {error ? (
              <NoData />
            ) : (isLoading || isDelaying) && page === 1 ? (
              <ul className={styles.painting_list}>
                {Array.from({ length: 3 }).map((_, index) => (
                  <li key={index} className={`${styles.skeleton_list_item}`}>
                    <div className={styles.skeleton_container}>
                      <Skeleton className={styles.skeleton_item} />
                    </div>
                  </li>
                ))}
              </ul>
            ) : paintings.data.length === 0 ? (
              <NoData />
            ) : (
              <ul className={styles.painting_list}>
                {paintings.data.map((painting) => (
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
                {loading === 'pending' && page > 1 && (
                  <>
                    {Array.from({ length: 3 }).map((_, index) => (
                      <li
                        key={`skeleton-${index}`}
                        className={`${styles.skeleton_list_item}`}
                      >
                        <div className={styles.skeleton_container}>
                          <Skeleton className={styles.skeleton_item} />
                        </div>
                      </li>
                    ))}
                  </>
                )}
                <InfiniteScrollTrigger
                  onTrigger={onLoadNextPage}
                  isLoading={loading === 'pending' && page > 1}
                  hasMore={
                    !isLastPage && paintings.data.length < paintings.total
                  }
                />
              </ul>
            )}
          </>
        )}
      </section>
    </main>
  )
}
