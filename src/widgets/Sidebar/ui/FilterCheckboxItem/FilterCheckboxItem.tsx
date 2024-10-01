import styles from './FilterCheckboxItem.module.scss'
import { FilterItem } from '../../model/types'

interface FilterCheckboxItemProps {
  filterList: FilterItem[]
}

const FilterCheckboxItem = ({ filterList }: FilterCheckboxItemProps) => (
  <ul className={styles.filter_list}>
    {filterList.map((filterItem) => (
      <li key={filterItem.id}>
        <label htmlFor={filterItem.id.toString()}>
          <input
            type='checkbox'
            id={filterItem.id.toString()}
            className={styles.checkbox_small}
          />
          <span className={styles.checkbox_label}>{filterItem.value}</span>
        </label>
      </li>
    ))}
  </ul>
)

export default FilterCheckboxItem
