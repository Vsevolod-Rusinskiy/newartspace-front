import { useAppDispatch } from '@/src/app/model/redux/hooks'
import { actionCheckFilterItem } from '../../model/sideBarFiltersSlice'
import { FilterItem } from '../../model/types'
import styles from './FilterCheckboxItem.module.scss'

interface FilterCheckboxItemProps {
  filterList: FilterItem[]
  filterName: string
}

const FilterCheckboxItem = ({
  filterList,
  filterName,
}: FilterCheckboxItemProps) => {
  const dispatch = useAppDispatch()
  const handleCheck = (id: number, filterName: string) => {
    dispatch(actionCheckFilterItem({ id, filterName, isRadioButton: false }))
  }
  return (
    <ul className={styles.filter_list}>
      {filterList.map((filterItem) => (
        <li key={filterItem.id}>
          <label htmlFor={filterItem.id.toString()}>
            <input
              type='checkbox'
              id={filterItem.id.toString()}
              checked={filterItem.isChecked}
              className={styles.checkbox_small}
              onChange={() => handleCheck(filterItem.id, filterName)}
            />
            <span className={styles.checkbox_label}>{filterItem.value}</span>
          </label>
        </li>
      ))}
    </ul>
  )
}

export default FilterCheckboxItem
