'use client'
import { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { createPortal } from 'react-dom'
import Htag from '@/src/shared/ui/Htag/Htag'
import FilterAccordion from '@/src/shared/ui/FilterAccordion/FilterAccordion'
import { useAppDispatch } from '@/src/app/model/redux/hooks'
import { RootState } from '@/src/app/model/redux/store'
import { useSelector } from 'react-redux'
import { fetchFiltersAction } from '@/src/widgets/Sidebar/model/sideBarFiltersSlice'
import styles from './Sidebar.module.scss'

export const Sidebar = () => {
  const dispatch = useAppDispatch()
  const { filters, loading, error } = useSelector(
    (state: RootState) => state.sideBarFilters
  )

  useEffect(() => {
    dispatch(fetchFiltersAction())
  }, [dispatch])

  useEffect(() => {
    if (loading === 'pending') {
      console.log('Loading filters...')
    }

    if (loading === 'succeeded') {
      console.log(filters, 222)
      console.log('Filters loaded successfully!')
    }

    if (loading === 'failed') {
      console.log('Error loading filters:', error)
    }
  }, [loading, error, filters])

  const [collapsed, setCollapsed] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const portalRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    setIsClient(true)
    portalRef.current = document.body
  }, [])

  if (!isClient || !portalRef.current) return null

  const onToggle = () => {
    setCollapsed((prev) => !prev)
  }

  return createPortal(
    <>
      <button
        onClick={onToggle}
        style={{
          position: 'fixed',
          top: '10px',
          left: '200px',
          zIndex: 1100,
        }}
      >
        toggle
      </button>
      <aside
        className={cn(styles.sidebar, {
          [styles.collapsed]: collapsed,
        })}
      >
        <div>
          <Htag tag={'h3'}>Фильтры</Htag>
          <ul>
            <FilterAccordion title='Виды искусства' filterName='artTypesList' />
            <FilterAccordion title='Цвета' filterName='formatsList' />
            {/*<FilterAccordion title='Форматы' filterItems={validFormatsList} />*/}
          </ul>
        </div>
      </aside>
    </>,
    portalRef.current as HTMLElement
  )
}
