import { createSelector } from 'reselect'
import { RootState } from '@/src/app/model/redux/store'

const selectFiltersState = (state: RootState) => state.sideBarFilters.filters

export const selectSelectedFilters = createSelector(
  [selectFiltersState],
  (filters) => {
    if (!filters) return {}

    const selectedFilters: { [key: string]: number[] } = {}

    Object.keys(filters).forEach((key) => {
      const selectedItems = filters[key as keyof typeof filters]
        .filter((item) => item.isChecked)
        .map((item) => item.id)
      if (selectedItems.length > 0) {
        selectedFilters[key] = selectedItems
      }
    })

    console.log(selectedFilters, 111)
    return selectedFilters
  }
)
