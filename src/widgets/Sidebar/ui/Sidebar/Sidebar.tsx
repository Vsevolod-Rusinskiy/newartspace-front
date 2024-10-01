'use client'
import { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { createPortal } from 'react-dom'
import Htag from '@/src/shared/ui/Htag/Htag'
import FilterAccordion from '@/src/widgets/Sidebar/ui/FilterAccordion/FilterAccordion'
import { useAppDispatch } from '@/src/app/model/redux/hooks'
import { fetchFiltersAction } from '../../model/sideBarFiltersSlice'
import { actionResetFilters } from '../../model/sideBarFiltersSlice'
import { ActionButton } from '@/src/shared/ui/buttons/ActionButton/ActionButton'
import { RootState } from '@/src/app/model/redux/store'
import styles from './Sidebar.module.scss'
import { useSelector } from 'react-redux'

export const Sidebar = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchFiltersAction())
  }, [dispatch])

  const [collapsed, setCollapsed] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const portalRef = useRef<HTMLElement | null>(null)

  const filters = useSelector(
    (state: RootState) => state.sideBarFilters.filters
  )

  useEffect(() => {
    setIsClient(true)
    portalRef.current = document.body
  }, [])

  if (!isClient || !portalRef.current) return null

  const onToggle = () => {
    setCollapsed((prev) => !prev)
  }

  const handleResetFilters = () => {
    console.log(filters)
    dispatch(actionResetFilters()) // Вызовите action без аргументов
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
          <ul className='filter_list'>
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
          <ActionButton onClick={handleResetFilters}>Показать</ActionButton>
        </div>
      </aside>
    </>,
    portalRef.current as HTMLElement
  )
}
