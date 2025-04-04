import { useAppDispatch } from '@/src/app/model/redux/hooks'
import { actionCheckFilterItem } from '../../model/sideBarFiltersSlice'
import { FilterItem } from '../../model/types'
import styles from './FilterCheckboxItem.module.scss'
import { useLang } from '@/src/shared/hooks/useLang'

interface FilterCheckboxItemProps {
  filterList: FilterItem[]
  filterName: string
}

const FilterCheckboxItem = ({
  filterList,
  filterName,
}: FilterCheckboxItemProps) => {
  const dispatch = useAppDispatch()
  const { lang, translations } = useLang()

  const handleCheck = (id: number, filterName: string) => {
    dispatch(actionCheckFilterItem({ id, filterName, isRadioButton: false }))
  }

  // Функция для получения переведенного значения фильтра
  const getTranslatedValue = (originalValue: string) => {
    // Применяем перевод только для artTypesList
    if (
      filterName === 'artTypesList' &&
      translations[lang].sidebar_filters.art_types_values
    ) {
      const artTypesValues = translations[lang].sidebar_filters
        .art_types_values as Record<string, string>

      return artTypesValues[originalValue] || originalValue
    }
    // Для всех остальных фильтров возвращаем оригинальное значение
    return originalValue
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
            <span className={styles.checkbox_label}>
              {getTranslatedValue(filterItem.value)}
            </span>
          </label>
        </li>
      ))}
    </ul>
  )
}

export default FilterCheckboxItem
