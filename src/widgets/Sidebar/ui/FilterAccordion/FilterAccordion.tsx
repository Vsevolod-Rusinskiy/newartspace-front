import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/src/app/model/redux/store'
import { Filters } from '../../model/types'
import FilterCheckboxItem from '@/src/widgets/Sidebar/ui/FilterCheckboxItem/FilterCheckboxItem'
import styles from './FilterAccordion.module.scss'

interface FilterAccordionProps {
  title: string
  filterName: keyof Filters
}

const FilterAccordion = ({ title, filterName }: FilterAccordionProps) => {
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
        <span className={`${styles.arrow} ${isOpen ? styles.open : ''}`} />
      </div>
      <div
        ref={contentRef}
        className={`${styles.filter_item_content} ${isOpen ? styles.open : ''}`}
      >
        <FilterCheckboxItem filterList={validFilterList} />
      </div>
    </li>
  )
}

export default FilterAccordion
