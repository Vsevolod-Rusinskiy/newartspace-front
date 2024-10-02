import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { API_BASE_URL } from '@/src/shared/config/apiConfig'
import { Filters, SideBarFiltersState } from './types'

// interface FilterItem {
//   id: number
//   value: string
//   priority: number
//   isChecked: boolean
// }

// interface Filters {
//   artTypesList: FilterItem[]
//   colorsList: FilterItem[]
//   formatsList: FilterItem[]
//   materialsList: FilterItem[]
//   priceList: FilterItem[]
//   sizeList: FilterItem[]
//   stylesList: FilterItem[]
//   themesList: FilterItem[]
// }

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
      console.log(data)
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

const sideBarFiltersSlice = createSlice({
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
      action: PayloadAction<{ id: number; filterName: string }>
    ) {
      const { id, filterName } = action.payload

      if (state.filters) {
        const filterArray = state.filters[filterName as keyof Filters]
        if (filterArray) {
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
export default sideBarFiltersSlice.reducer
