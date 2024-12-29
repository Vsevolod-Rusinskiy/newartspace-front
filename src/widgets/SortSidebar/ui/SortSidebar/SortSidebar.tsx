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

export const SortSidebar = () => {
  const dispatch = useAppDispatch()
  const [isClient, setIsClient] = useState(false)
  const portalRef = useRef<HTMLElement | null>(null)
  const sidebarRef = useRef<HTMLDivElement | null>(null)

  const isClosed = useAppSelector(
    (state) => state.sortSideBarVisibility.isClosed
  )

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
          <Htag tag={'h3'}>Сортировка</Htag>
          {/* Здесь будет контент для сортировки */}
        </div>
      </aside>
    </>,
    portalRef.current as HTMLElement
  )
}
