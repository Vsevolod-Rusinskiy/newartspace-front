import { createSelector } from 'reselect'
import { RootState } from '@/src/app/model/redux/store'

const selectFiltersState = (state: RootState) => state.sideBarFilters.filters

export const selectSelectedFilters = createSelector(
  [selectFiltersState],
  (filters) => {
    if (!filters) return {}
    console.log(filters, 'filters!!!!')
    const selectedFilters: { [key: string]: string[] } = {}

    Object.keys(filters).forEach((key) => {
      const selectedItems = filters[key as keyof typeof filters]
        .filter((item) => item.isChecked)
        .map((item) => item.value)
      if (selectedItems.length > 0) {
        selectedFilters[key] = selectedItems
      }
    })
    console.log(selectedFilters, 'selectedFilters!!!!')
    return selectedFilters
  }
)
