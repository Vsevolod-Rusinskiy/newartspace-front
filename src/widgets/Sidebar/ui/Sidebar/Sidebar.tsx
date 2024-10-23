'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import cn from 'classnames'
import { createPortal } from 'react-dom'
import { Htag } from '@/src/shared/ui/Htag/Htag'
import FilterAccordion from '@/src/widgets/Sidebar/ui/FilterAccordion/FilterAccordion'
import { useAppDispatch, useAppSelector } from '@/src/app/model/redux/hooks'
import {
  fetchFiltersAction,
  actionResetFilters,
} from '../../model/sideBarFiltersSlice'
import { DefaultButton } from '@/src/shared/ui/buttons/DefaultButton/DefaultButton'
import { selectSelectedFilters } from '../../model/selectors'
import { sendSelectedFilters } from '../../api/sendSelectedFilters'
import styles from './Sidebar.module.scss'
import {
  actionOpenSideBar,
  actionToggleSideBar,
} from '@/src/pages/HomePage/model/sideBarVisibilitySlice'
import { updateHomePageData } from '@/src/pages/HomePage/model/homePageSlice'

export const Sidebar = () => {
  const dispatch = useAppDispatch()
  const selectedFilters = useAppSelector(selectSelectedFilters)

  useEffect(() => {
    dispatch(fetchFiltersAction())
  }, [dispatch])

  const [isClient, setIsClient] = useState(false)
  const portalRef = useRef<HTMLElement | null>(null)
  const sidebarRef = useRef<HTMLDivElement | null>(null)

  const isClosed = useAppSelector((state) => state.sideBarVisibility.isClosed)

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dispatch(actionOpenSideBar())
      }
    },
    [dispatch]
  )

  useEffect(() => {
    if (isClosed) {
      window.addEventListener('keydown', onKeyDown)
    }
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isClosed])

  useEffect(() => {
    setIsClient(true)
    portalRef.current = document.body
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        dispatch(actionOpenSideBar())
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dispatch])

  if (!isClient || !portalRef.current) return null

  const onToggle = () => {
    dispatch(actionToggleSideBar())
  }

  const handleResetFilters = () => {
    dispatch(actionResetFilters())
  }

  const handleShowFilters = async () => {
    try {
      const response = await sendSelectedFilters(selectedFilters)
      console.log('Filters sent successfully:', response)
      dispatch(updateHomePageData(response.data))
      dispatch(actionToggleSideBar())
    } catch (error) {
      console.error('Error sending filters:', error)
    }
  }

  return createPortal(
    <>
      <aside
        ref={sidebarRef}
        className={cn(styles.sidebar, {
          [styles.collapsed]: isClosed,
        })}
      >
        <button onClick={onToggle} className={styles.close_button} />
        <div>
          <Htag tag={'h3'}>Фильтры</Htag>
          <ul className={styles.filter_list}>
            <FilterAccordion
              title='Цены'
              filterName='priceList'
              filterType='radio'
            />
            <FilterAccordion
              title='Виды искусства'
              filterName='artTypesList'
              filterType='checkbox'
            />
            <FilterAccordion
              title='Стили'
              filterName='stylesList'
              filterType='checkbox'
            />
            <FilterAccordion
              title='Материалы'
              filterName='materialsList'
              filterType='checkbox'
            />
            <FilterAccordion
              title='Размеры'
              filterName='sizeList'
              filterType='checkbox'
            />
            <FilterAccordion
              title='Цвета'
              filterName='colorsList'
              filterType='checkbox'
            />
            <FilterAccordion
              title='Тематика'
              filterName='themesList'
              filterType='checkbox'
            />
            <FilterAccordion
              title='Форматы'
              filterName='formatsList'
              filterType='checkbox'
            />
          </ul>
          <div className={styles.button_container}>
            <DefaultButton
              onClick={handleResetFilters}
              className={styles.button}
            >
              Сбросить
            </DefaultButton>
            <DefaultButton
              onClick={handleShowFilters}
              className={styles.button}
            >
              Показать
            </DefaultButton>
          </div>
        </div>
      </aside>
    </>,
    portalRef.current as HTMLElement
  )
}
