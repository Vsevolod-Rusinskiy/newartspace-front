import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { API_BASE_URL } from '@/src/shared/config/apiConfig'
import { SortParams } from '@/src/widgets/SortSidebar/model/types'
import { IPainting } from '@/src/entities/Painting'

interface PaintingsState {
  paintings: { data: IPainting[]; total: number }
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null | undefined
  artStyle: string | null
}

interface FilterItem {
  [key: number]: string
}

interface Pagination {
  page: number
  limit: number
  artStyle: string | null
  filters?: { [key: string]: (string | FilterItem)[] }
  sort?: SortParams
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
  async (
    { page, limit, artStyle, filters, sort }: Pagination,
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams()
      params.append('page', page.toString())
      params.append('limit', limit.toString())
      if (artStyle) params.append('artStyle', artStyle)
      if (filters) params.append('filters', JSON.stringify(filters))
      if (sort) params.append('sort', JSON.stringify(sort))

      const queryString = params.toString()

      const response = await fetch(`${API_BASE_URL}/paintings?${queryString}`)
      if (!response.ok) {
        return rejectWithValue('Failed to fetch paintings')
      }
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue('Failed to load data')
    }
  }
)

export const initialState: PaintingsState = {
  paintings: { data: [], total: 0 },
  loading: 'idle',
  error: null,
  artStyle: null,
}

export const paintingsSlice = createSlice({
  name: 'paintings',
  initialState,
  reducers: {
    updateHomePageData: (
      state: PaintingsState,
      action: PayloadAction<IPainting[]>
    ) => {
      state.paintings.data = action.payload
      state.paintings.total = action.payload.length
    },
    setArtStyle: (state, action: PayloadAction<string>) => {
      state.artStyle = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaintingsAction.pending, (state, action) => {
        state.loading = 'pending'
        state.error = null
        if (action.meta?.arg.page === 1) {
          state.paintings.data = []
          state.paintings.total = 0
        }
      })
      .addCase(fetchPaintingsAction.fulfilled, (state, action) => {
        state.loading = 'succeeded'

        // Если это первая страница - заменяем данные
        if (action.meta?.arg.page === 1) {
          state.paintings.data = action.payload.data
        } else {
          // Если не первая - добавляем к существующим
          state.paintings.data = [
            ...state.paintings.data,
            ...action.payload.data,
          ]
        }

        // В любом случае обновляем total
        state.paintings.total = action.payload.total
        state.error = null
      })
      .addCase(fetchPaintingsAction.rejected, (state, action) => {
        state.loading = 'failed'
        state.error =
          (action.payload as string | undefined) || action.error.message || null
      })
  },
})

export const { updateHomePageData, setArtStyle } = paintingsSlice.actions

export default paintingsSlice.reducer
