import { useAppDispatch } from '@/src/app/model/redux/hooks'
import { actionCheckFilterItem } from '../../model/sideBarFiltersSlice'
import { FilterItem } from '../../model/types'
import styles from './FilterRadioItem.module.scss'
import { useLang } from '@/src/shared/hooks/useLang'

interface FilterRadioItemProps {
  filterList: FilterItem[]
  filterName: string
}

const FilterRadioItem = ({ filterList, filterName }: FilterRadioItemProps) => {
  const dispatch = useAppDispatch()
  const { lang, translations } = useLang()

  const handleCheck = (id: number, filterName: string) => {
    dispatch(actionCheckFilterItem({ id, filterName, isRadioButton: true }))
  }

  // Функция для получения переведенного значения фильтра
  const getTranslatedValue = (originalValue: string) => {
    // Применяем перевод для цен
    if (
      filterName === 'priceList' &&
      translations[lang].sidebar_filters.price_values
    ) {
      const priceValues = translations[lang].sidebar_filters
        .price_values as Record<string, string>

      return priceValues[originalValue] || originalValue
    }

    // Для всех остальных фильтров возвращаем оригинальное значение
    return originalValue
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
              <span className={styles.radio_label}>
                {getTranslatedValue(filterItem.value)}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FilterRadioItem
