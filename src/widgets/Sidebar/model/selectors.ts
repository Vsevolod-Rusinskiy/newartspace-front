import { createSelector } from 'reselect'
import { RootState } from '@/src/app/model/redux/store'

const selectFiltersState = (state: RootState) => state.sideBarFilters.filters

// Поля, для которых нужно отправлять объекты с id:value
const ID_VALUE_FILTERS = new Set([
  'materialsList',
  'techniquesList',
  'themesList',
  'colorsList',
])

type FilterItem = { [key: number]: string }

export const selectSelectedFilters = createSelector(
  [selectFiltersState],
  (filters) => {
    if (!filters) return {}
    const selectedFilters: { [key: string]: (string | FilterItem)[] } = {}

    Object.keys(filters).forEach((key) => {
      if (key === 'materialsList') {
        const selectedItems = filters[key]
          .filter((item) => item.isChecked)
          .reduce(
            (acc, item) => {
              const filterItem = { [item.id]: item.value }
              const listKey =
                item.type === 'technique' ? 'techniquesList' : 'materialsList'

              if (!acc[listKey]) acc[listKey] = []
              acc[listKey].push(filterItem)
              return acc
            },
            {} as { materialsList: FilterItem[]; techniquesList: FilterItem[] }
          )

        // Добавляем только непустые списки
        if (selectedItems.materialsList?.length) {
          selectedFilters.materialsList = selectedItems.materialsList
        }
        if (selectedItems.techniquesList?.length) {
          selectedFilters.techniquesList = selectedItems.techniquesList
        }
      } else {
        const selectedItems = filters[key as keyof typeof filters]
          .filter((item) => item.isChecked)
          .map((item) => {
            if (ID_VALUE_FILTERS.has(key)) {
              return { [item.id]: item.value }
            }
            return item.value
          })
        if (selectedItems.length > 0) {
          selectedFilters[key] = selectedItems
        }
      }
    })
    return selectedFilters
  }
)
