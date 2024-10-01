import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/src/app/model/redux/store'
import { Filters } from '../../model/types'
import FilterCheckboxItem from '../FilterCheckboxItem/FilterCheckboxItem'
import FilterRadioItem from '../FilterRadioItem/FilterRadioItem'
import cn from 'classnames'
import styles from './FilterAccordion.module.scss'

interface FilterAccordionProps {
  title: string
  filterName: keyof Filters | 'priceList'
  filterType: 'checkbox' | 'radio' // Добавляем тип фильтра
}

const priceList = [
  { id: 1, value: 'до 10 000 руб.' },
  { id: 2, value: '10 000 - 50 000 руб.' },
  { id: 3, value: '50 000 - 100 000 руб.' },
  { id: 4, value: '100 000 - 150 000 руб.' },
  { id: 5, value: '150 000 - 250 000 руб.' },
  { id: 6, value: '250 000 - 300 000 руб.' },
  { id: 7, value: 'свыше 300 000 руб.' },
]

const FilterAccordion = ({
  title,
  filterName,
  filterType,
}: FilterAccordionProps) => {
  const { filters } = useSelector((state: RootState) => state.sideBarFilters)
  const [isOpen, setIsOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const validFilterList =
    filters && filters[filterName] ? filters[filterName] : []

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isOpen
        ? `${contentRef.current.scrollHeight}px`
        : '0px'
    }
  }, [isOpen])

  return (
    <li className={styles.filter_item}>
      <div className={styles.filter_item_header} onClick={toggleAccordion}>
        <span className={styles.filter_item_title}>{title}</span>
        <span className={cn(styles.arrow, { [styles.open]: isOpen })} />
      </div>
      <div
        ref={contentRef}
        className={cn(styles.filter_item_content, { [styles.open]: isOpen })}
      >
        {filterType === 'checkbox' ? (
          <FilterCheckboxItem filterList={validFilterList} />
        ) : (
          <FilterRadioItem filterList={priceList} />
        )}
      </div>
    </li>
  )
}

export default FilterAccordion
