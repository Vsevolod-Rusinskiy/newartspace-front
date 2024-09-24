import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { API_BASE_URL } from '@/src/shared/config/apiConfig'
import { Filters, SideBarFiltersState } from './types'

export const fetchFiltersAction = createAsyncThunk<Filters>(
  'sideBarFilters/fetchFilters',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/attributes`)
      if (!response.ok) {
        return rejectWithValue('Failed to fetch filters')
      }
      const data = await response.json()
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

export const sideBarFiltersSlice = createSlice<
  SideBarFiltersState,
  Record<string, never>,
  string,
  any // eslint-disable-line @typescript-eslint/no-explicit-any
>({
  name: 'sideBarFilters',
  initialState,
  reducers: {},
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

export default sideBarFiltersSlice.reducer
