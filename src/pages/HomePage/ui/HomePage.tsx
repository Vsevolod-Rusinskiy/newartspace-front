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
import { Paginate } from '@/src/shared/ui/Pagination/Pagination'
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

  const limit = 9
  const totalPages = Math.ceil(paintings.total / limit)
  const isLastPage = page >= totalPages

  console.log(
    'Current page:',
    page,
    'Total pages:',
    totalPages,
    'Is last page:',
    isLastPage
  )

  const selectedFilters = useSelector(selectSelectedFilters)
  const sortType = useSelector((state: RootState) => state.sort.sortType)

  useEffect(() => {
    // При изменении фильтров или сортировки сбрасываем на первую страницу
    if (sortType || Object.keys(selectedFilters).length > 0) {
      setPage(1)
    }

    dispatch(
      fetchPaintingsAction({
        page,
        limit,
        artStyle,
        filters: selectedFilters,
        sort: getSortParams(sortType),
      })
    )
  }, [page, sortType, selectedFilters, artStyle, dispatch, limit])

  const onLoadNextPage = useCallback(() => {
    // Не загружаем следующую страницу, если это последняя
    if (isLastPage) {
      console.log('Достигнута последняя страница')
      return
    }
    setPage((prev) => prev + 1)
  }, [isLastPage])

  const handlePageClick = (selectedItem: { selected: number }) => {
    const newPage = selectedItem.selected + 1
    setPage(newPage)
  }

  const paintingArray = Array.isArray(paintings.data) ? paintings.data : []
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
            Каталог
          </Htag>
        ) : (
          <div className={styles.content_header}>
            <DefaultButton
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                dispatch(actionToggleSideBar())
              }}
              className={cn(styles.filter_button, 'filter_button')}
            >
              Фильтры
              <FilterBadge
                isVisible={Object.keys(selectedFilters).length > 0}
              />
            </DefaultButton>
            <Htag tag='h1' className={styles.catalog_title_filters}>
              Каталог
            </Htag>
            <DefaultButton
              onClick={() => dispatch(actionToggleSortSideBar())}
              className={cn(styles.sort_button, 'sort_button')}
            >
              Сортировка
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
            <span>Современность</span>
          </HomePageButton>
          <HomePageButton
            className={cn('shadow_button', 'wide_button', {
              active: selectedArtStyle === 'Традиции',
              shrink: selectedArtStyle || artStyle !== null,
            })}
            onClick={() => handleArtStyleChange('Традиции')}
          >
            <span>Традиции</span>
          </HomePageButton>
        </div>

        {paintings.data.length > 0 && (
          <Paginate
            pageCount={Math.ceil(paintings.total / limit)}
            onPageChange={handlePageClick}
            forcePage={page - 1}
          />
        )}
        {selectedArtStyle && (
          <>
            {error ? (
              <NoData />
            ) : isLoading || isDelaying ? (
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
                {paintingArray.map((painting) => (
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
                <InfiniteScrollTrigger
                  onTrigger={onLoadNextPage}
                  isLoading={isLoading}
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
