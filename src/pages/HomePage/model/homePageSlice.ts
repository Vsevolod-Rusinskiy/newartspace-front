import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { API_BASE_URL } from '@/src/shared/config/apiConfig'

console.log('ApiUrl:', API_BASE_URL)

interface Painting {
  id: string
  author: string
  imgUrl: string
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
  paintings: { data: Painting[]; total: number }
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null | undefined
  artStyle: string
}

interface Pagination {
  page: number
  limit: number
  artStyle: string
}

interface FetchPaintingsResult {
  data: Painting[]
  total: number
}

export const fetchPaintingsAction = createAsyncThunk<
  FetchPaintingsResult,
  Pagination
>(
  'paintings/fetchPaintings',
  async ({ page, limit, artStyle }: Pagination, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/paintings?page=${page}&limit=${limit}&artStyle=${artStyle}`
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
  artStyle: 'Классика',
}

export const paintingsSlice = createSlice({
  name: 'paintings',
  initialState,
  reducers: {
    updateHomePageData: (
      state: PaintingsState,
      action: PayloadAction<Painting[]>
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

export const { updateHomePageData, setArtStyle } = paintingsSlice.actions

export default paintingsSlice.reducer
