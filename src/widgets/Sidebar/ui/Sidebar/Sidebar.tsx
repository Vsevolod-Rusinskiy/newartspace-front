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
import {
  actionOpenSideBar,
  actionToggleSideBar,
} from '@/src/pages/HomePage/model/sideBarVisibilitySlice'
import { updateHomePageData } from '@/src/pages/HomePage/model/homePageSlice'
import { useLang } from '@/src/shared/hooks/useLang'
import styles from './Sidebar.module.scss'

export const Sidebar = () => {
  const dispatch = useAppDispatch()
  const selectedFilters = useAppSelector(selectSelectedFilters)
  const artStyle = useAppSelector((state) => state.paintings.artStyle)
  const { lang, translations } = useLang()

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
  }, [isClosed, onKeyDown])

  useEffect(() => {
    setIsClient(true)
    portalRef.current = document.body
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const filterButton = document.querySelector('.filter_button')
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        !filterButton?.contains(event.target as Node)
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
      console.log('Отправляемые фильтры:', selectedFilters)
      const response = await sendSelectedFilters(selectedFilters, artStyle)
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
          <Htag tag={'h3'}>{translations[lang].sidebar_filters.title}</Htag>
          <ul className={styles.filter_list}>
            <FilterAccordion
              title={translations[lang].sidebar_filters.price}
              filterName='priceList'
              filterType='radio'
            />
            <FilterAccordion
              title={translations[lang].sidebar_filters.art_types}
              filterName='artTypesList'
              filterType='checkbox'
            />
            <FilterAccordion
              title={translations[lang].sidebar_filters.styles}
              filterName='stylesList'
              filterType='checkbox'
            />
            <FilterAccordion
              title={translations[lang].sidebar_filters.materials}
              filterName='materialsList'
              filterType='checkbox'
            />
            <FilterAccordion
              title={translations[lang].sidebar_filters.sizes}
              filterName='sizeList'
              filterType='checkbox'
            />
            <FilterAccordion
              title={translations[lang].sidebar_filters.colors}
              filterName='colorsList'
              filterType='checkbox'
            />
            <FilterAccordion
              title={translations[lang].sidebar_filters.themes}
              filterName='themesList'
              filterType='checkbox'
            />
            <FilterAccordion
              title={translations[lang].sidebar_filters.formats}
              filterName='formatsList'
              filterType='checkbox'
            />
          </ul>
          <div className={styles.button_container}>
            <DefaultButton
              onClick={handleResetFilters}
              className={styles.button}
            >
              {translations[lang].sidebar_filters.reset}
            </DefaultButton>
            <DefaultButton
              onClick={handleShowFilters}
              className={styles.button}
            >
              {translations[lang].sidebar_filters.show}
            </DefaultButton>
          </div>
        </div>
      </aside>
    </>,
    portalRef.current as HTMLElement
  )
}
