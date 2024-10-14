import { useAppDispatch } from '@/src/app/model/redux/hooks'
import { actionCheckFilterItem } from '../../model/sideBarFiltersSlice'
import { FilterItem } from '../../model/types'
import styles from './FilterRadioItem.module.scss'

interface FilterRadioItemProps {
  filterList: FilterItem[]
  filterName: string
}

const FilterRadioItem = ({ filterList, filterName }: FilterRadioItemProps) => {
  const dispatch = useAppDispatch()

  const handleCheck = (id: number, filterName: string) => {
    dispatch(actionCheckFilterItem({ id, filterName, isRadioButton: true }))
  }

  return (
    <div>
      <ul className={styles.filter_list}>
        {filterList.map((filterItem) => (
          <li key={filterItem.id}>
            <label htmlFor={filterItem.id.toString()}>
              <input
                type='radio'
                id={filterItem.id.toString()}
                name={filterName}
                className={styles.radio_small}
                checked={filterItem.isChecked}
                onChange={() => handleCheck(filterItem.id, filterName)}
              />
              <span className={styles.radio_label}>{filterItem.value}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FilterRadioItem
