import styles from './FilterRadioItem.module.scss'
import { FilterItem } from '../../model/types'

interface FilterRadioItemProps {
  filterList: FilterItem[]
}

const FilterRadioItem = ({ filterList }: FilterRadioItemProps) => {
  console.log(filterList)

  return (
    <ul className={styles.filter_list}>
      {filterList.map((filterItem) => (
        <li key={filterItem.id}>
          <label htmlFor={filterItem.id.toString()}>
            <input
              type='radio'
              id={filterItem.id.toString()}
              name='filter'
              className={styles.radio_small}
            />
            <span className={styles.radio_label}>{filterItem.value}</span>
          </label>
        </li>
      ))}
    </ul>
  )
}

export default FilterRadioItem
