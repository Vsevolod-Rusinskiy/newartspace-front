import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { API_BASE_URL } from '@/src/shared/config/apiConfig'
import { Filters, SideBarFiltersState } from './types'

const resetIsChecked = (filters: Filters) => {
  Object.keys(filters).forEach((key) => {
    filters[key as keyof Filters].forEach((item) => {
      item.isChecked = false
    })
  })
}

export const fetchFiltersAction = createAsyncThunk<Filters>(
  'sideBarFilters/fetchFilters',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/attributes`)
      if (!response.ok) {
        return rejectWithValue('Failed to fetch filters')
      }
      const data = await response.json()

      /* объединяем два массива в один и сортируем по значению
      объединить массивы (чем рисуют и на чем рисуют) это пожелание клиента
      */

      data.data.materialsList = [
        ...data.data.materialsList,
        ...data.data.techniquesList,
      ]
      data.data.materialsList.sort(
        (a: { value: string }, b: { value: string }) =>
          a.value.localeCompare(b.value)
      )

      return data.data
    } catch (error) {
      return rejectWithValue('Failed to load filters')
    }
  }
)

export const initialState: SideBarFiltersState = {
  filters: null,
  loading: 'idle',
  error: null,
}

export const sideBarFiltersSlice = createSlice({
  name: 'sideBarFilters',
  initialState,
  reducers: {
    actionResetFilters(state: SideBarFiltersState) {
      if (state.filters) {
        resetIsChecked(state.filters)
      }
    },
    actionCheckFilterItem(
      state: SideBarFiltersState,
      action: PayloadAction<{
        id: number
        filterName: string
        isRadioButton: boolean
      }>
    ) {
      const { id, filterName, isRadioButton } = action.payload

      if (state.filters) {
        const filterArray = state.filters[filterName as keyof Filters]
        if (filterArray) {
          if (isRadioButton) {
            filterArray.forEach((item) => {
              item.isChecked = false
            })
          }
          const filterItem = filterArray.find((item) => item.id === id)
          if (filterItem) {
            filterItem.isChecked = !filterItem.isChecked
          }
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiltersAction.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(
        fetchFiltersAction.fulfilled,
        (state, action: PayloadAction<Filters>) => {
          state.loading = 'succeeded'
          state.filters = action.payload
        }
      )
      .addCase(fetchFiltersAction.rejected, (state, action) => {
        state.loading = 'failed'
        state.error =
          (action.payload as string | undefined) || action.error.message || null
      })
  },
})

export const { actionResetFilters, actionCheckFilterItem } =
  sideBarFiltersSlice.actions
