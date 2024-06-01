import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Painting } from '@/types/paintings'

export const fetchPaintings = createAsyncThunk(
  'paintings/fetchPaintings',
  async () => {
    const response = await fetch('http://localhost:3000/paintings')
    if (!response.ok) {
      throw new Error('Failed to fetch paintings')
    }
    const data = await response.json()
    return data
  }
)

interface PaintingsState {
  paintings: Painting[]
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: PaintingsState = {
  paintings: [],
  loading: 'idle',
  error: null,
}

export const paintingsSlice = createSlice({
  name: 'paintings',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaintings.pending, (state) => {
        state.loading = 'loading'
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
