import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IPainting } from '@/types/paintings'

export const fetchPaintings = createAsyncThunk(
  'paintings/fetchPaintings',
  async () => {
    const response = await fetch('http://localhost:3000/paintings')
    if (!response.ok) {
      throw new Error('Failed to fetch paintings')
    }
    return await response.json()
  }
)

interface PaintingsState {
  paintings: { data: IPainting[]; total: number } // Используем IPainting для типизации массива data
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null | undefined
}

const initialState: PaintingsState = {
  paintings: { data: [], total: 0 },
  loading: 'idle',
  error: null,
}

export const paintingsSlice = createSlice({
  name: 'paintings',
  initialState,
  reducers: {}, // Пустой объект редьюсеров
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
