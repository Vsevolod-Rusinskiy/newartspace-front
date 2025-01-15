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
    })
    return selectedFilters
  }
)
