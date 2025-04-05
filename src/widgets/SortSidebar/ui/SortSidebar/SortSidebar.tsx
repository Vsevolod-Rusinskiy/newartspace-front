'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import cn from 'classnames'
import { createPortal } from 'react-dom'
import { Htag } from '@/src/shared/ui/Htag/Htag'
import { useAppDispatch, useAppSelector } from '@/src/app/model/redux/hooks'
import styles from './SortSidebar.module.scss'
import {
  actionOpenSortSideBar,
  actionToggleSortSideBar,
} from '../../model/sortSideBarVisibilitySlice'
import { SortSpan } from '../SortSpan/SortSpan'
import { setSortType, SortType } from '../../model/sortSlice'
import { useLang } from '@/src/shared/hooks/useLang'

export const SortSidebar = () => {
  const dispatch = useAppDispatch()
  const { lang, translations } = useLang()
  const [isClient, setIsClient] = useState(false)
  const portalRef = useRef<HTMLElement | null>(null)
  const sidebarRef = useRef<HTMLDivElement | null>(null)

  const isClosed = useAppSelector(
    (state) => state.sortSideBarVisibility.isClosed
  )
  const currentSortType = useAppSelector((state) => state.sort.sortType)

  // Функция для получения переведенного текста сортировки
  const getSortOptionText = (sortType: SortType): string => {
    if (!sortType) return ''
    return translations[lang].catalog_page.sorting_options[sortType] || sortType
  }

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dispatch(actionOpenSortSideBar())
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
      const sortButton = document.querySelector('.sort_button')
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        !sortButton?.contains(event.target as Node)
      ) {
        dispatch(actionOpenSortSideBar())
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dispatch])

  if (!isClient || !portalRef.current) return null

  const onToggle = () => {
    dispatch(actionToggleSortSideBar())
  }

  const handleSortChange = (type: SortType) => {
    dispatch(setSortType(type))
    dispatch(actionToggleSortSideBar())
  }

  return createPortal(
    <>
      <aside
        ref={sidebarRef}
        className={cn(styles.sort_sidebar, {
          [styles.collapsed]: isClosed,
        })}
      >
        <button onClick={onToggle} className={styles.close_button} />
        <div>
          <Htag tag={'h3'}>{translations[lang].catalog_page.sorting}</Htag>
          <div className={styles.sort_list}>
            <SortSpan
              text={getSortOptionText('expensive')}
              isActive={currentSortType === 'expensive'}
              onClick={() => handleSortChange('expensive')}
            />
            <SortSpan
              text={getSortOptionText('cheap')}
              isActive={currentSortType === 'cheap'}
              onClick={() => handleSortChange('cheap')}
            />
            <SortSpan
              text={getSortOptionText('new')}
              isActive={currentSortType === 'new'}
              onClick={() => handleSortChange('new')}
            />
          </div>
        </div>
      </aside>
    </>,
    portalRef.current as HTMLElement
  )
}
