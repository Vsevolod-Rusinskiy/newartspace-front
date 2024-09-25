import { useState } from 'react'
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

  const validFilterList =
    filters && filters[filterName] ? filters[filterName] : []

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <li className={styles.filter_item}>
      <div className={styles.filter_item_header} onClick={toggleAccordion}>
        <span className={styles.filter_item_title}>{title}</span>
        <span className={`${styles.arrow} ${isOpen ? styles.open : ''}`} />
      </div>
      {isOpen && <FilterCheckboxItem filterList={validFilterList} />}
    </li>
  )
}

export default FilterAccordion
