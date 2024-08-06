import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

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
  // color: string
}
interface PaintingsState {
  paintings: { data: IPainting[]; total: number }
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null | undefined
}

export const fetchPaintings = createAsyncThunk(
  'paintings/fetchPaintings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/paintings`
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

const initialState: PaintingsState = {
  paintings: { data: [], total: 0 },
  loading: 'idle',
  error: null,
}

// @ts-ignore
export const paintingsSlice = createSlice({
  name: 'paintings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaintings.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(fetchPaintings.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.paintings = action.payload
      })
      .addCase(fetchPaintings.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.error.message
      })
  },
})

export default paintingsSlice.reducer
