// import styles from './FilterAccordion.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '@/src/app/model/redux/store'

// Определяем интерфейс локально (или импортируем его из слайса)
interface FilterItem {
  id: number
  priority: number
  value: string
}

interface Filters {
  artTypesList: FilterItem[]
  colorsList: FilterItem[]
  formatsList: FilterItem[]
  // Добавьте другие списки фильтров, которые вам нужны
}

// Интерфейс пропсов
interface FilterAccordionProps {
  title: string
  filterName: keyof Filters // Используем тип Filters
}

const FilterAccordion = ({ title, filterName }: FilterAccordionProps) => {
  const { filters } = useSelector((state: RootState) => state.sideBarFilters)

  const validFilterList =
    filters && filters[filterName] ? filters[filterName] : []

  console.log(validFilterList, 777)
  return <li>{title}</li>
}

export default FilterAccordion
