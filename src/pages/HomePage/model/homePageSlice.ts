import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { API_BASE_URL } from '@/src/shared/config/apiConfig'

console.log('ApiUrl:', API_BASE_URL)

interface IPainting {
  id: string
  author: string
  paintingUrl: string
  title: string
  artType: string
  price: number
  theme: string
  style: string
  materials: string
  height: number
  width: number
  yearOfCreation: number
  format: string
  color: string
}
interface PaintingsState {
  paintings: { data: IPainting[]; total: number }
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null | undefined
}
interface Pagination {
  page: number
  limit: number
}

interface FetchPaintingsResult {
  data: IPainting[]
  total: number
}

export const fetchPaintingsAction = createAsyncThunk<
  FetchPaintingsResult,
  Pagination
>(
  'paintings/fetchPaintings',
  async ({ page, limit }: Pagination, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/paintings?page=${page}&limit=${limit}`
      )
      if (!response.ok) {
        return rejectWithValue('Failed to fetch paintings')
      }
      return await response.json()
    } catch (error) {
      return rejectWithValue('Failed to load data')
    }
  }
)

export const initialState: PaintingsState = {
  paintings: { data: [], total: 0 },
  loading: 'idle',
  error: null,
}

export const paintingsSlice = createSlice<
  PaintingsState,
  Record<string, never>,
  string,
  any // eslint-disable-line @typescript-eslint/no-explicit-any
>({
  name: 'paintings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaintingsAction.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(
        fetchPaintingsAction.fulfilled,
        (state, action: PayloadAction<FetchPaintingsResult>) => {
          state.loading = 'succeeded'
          state.paintings = action.payload
        }
      )
      .addCase(fetchPaintingsAction.rejected, (state, action) => {
        state.loading = 'failed'
        state.error =
          (action.payload as string | undefined) || action.error.message || null
      })
  },
})

export default paintingsSlice.reducer
