// import styles from './FilterAccordion.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '@/src/app/model/redux/store'

interface FilterItem {
  id: number
  priority: number
  value: string
}

interface Filters {
  artTypesList: FilterItem[]
  colorsList: FilterItem[]
  formatsList: FilterItem[]
  materialsList: FilterItem[]
  stylesList: FilterItem[]
  themesList: FilterItem[]
  techniquesList: FilterItem[]
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
