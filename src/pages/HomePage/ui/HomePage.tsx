'use client'
/* eslint-disable */
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/src/app/model/redux/hooks'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { fetchPaintingsAction, setArtStyle } from '../model/homePageSlice'
import { RootState } from '@/src/app/model/redux/store'
import { PaintingListItem } from '@/src/shared/ui/PaintingListItem/PaintingListItem'
import { Paginate } from '@/src/shared/ui/Pagination/Pagination'
import { Htag } from '@/src/shared/ui/Htag/Htag'
import { DefaultButton } from '@/src/shared/ui/buttons/DefaultButton/DefaultButton'
import { actionToggleSideBar } from '../model/sideBarVisibilitySlice'
import styles from './HomePage.module.scss'
import cn from 'classnames'

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

  const handlePageClick = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1)
    if (selectedArtStyle) {
      dispatch(
        fetchPaintingsAction({
          page: selectedItem.selected + 1,
          limit,
          artStyle: selectedArtStyle,
        })
      )
    }
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
    dispatch(fetchPaintingsAction({ page: 1, limit, artStyle: style }))
    setSelectedArtStyle(style)
  }

  if (error) return <div>Error: {error}</div>

  return (
    <main className={styles.main}>
      <section className={`container ${styles.content}`}>
        <div className={styles.content_header}>
          <DefaultButton
            onClick={() => dispatch(actionToggleSideBar())}
            className={styles.filter_button}
          >
            Фильтры
          </DefaultButton>
          <Htag tag='h1' className={styles.catalog_title}>
            Каталог
          </Htag>
          <DefaultButton className={styles.sort_button} disabled>
            Сортировка
          </DefaultButton>
        </div>
        <div className={styles.button_container}>
          <DefaultButton
            className={cn('shadow_button', 'wide_button', {
              active: selectedArtStyle === 'Классика',
              shrink: selectedArtStyle || artStyle !== null,
            })}
            onClick={() => handleArtStyleChange('Классика')}
          >
            <span>Традиции</span>
          </DefaultButton>
          <DefaultButton
            className={cn('shadow_button', 'wide_button', {
              active: selectedArtStyle === 'Современность',
              shrink: selectedArtStyle || artStyle !== null,
            })}
            onClick={() => handleArtStyleChange('Современность')}
          >
            <span>Современность</span>
          </DefaultButton>
        </div>

        {selectedArtStyle && (
          <ul className={styles.painting_list}>
            {isLoading || isDelaying
              ? Array.from({ length: 3 }).map((_, index) => (
                  <li key={index} className={`${styles.skeleton_list_item}`}>
                    <div className={styles.skeleton_container}>
                      <Skeleton className={styles.skeleton_item} />
                    </div>
                  </li>
                ))
              : paintingArray.map((painting) => (
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
                  />
                ))}
          </ul>
        )}
        {paintings.data.length > 0 && (
          <Paginate
            pageCount={Math.ceil(paintings.total / limit)}
            onPageChange={handlePageClick}
            forcePage={page - 1}
          />
        )}
      </section>
    </main>
  )
}
