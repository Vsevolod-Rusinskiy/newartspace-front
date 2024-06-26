import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IPainting } from '@/types/paintings'
// todo
console.log(`NEXT_PUBLIC_HOST-slice)`, process.env.NEXT_PUBLIC_HOST)
console.log(`NEXT_PUBLIC_PROTOCOL-slice`, process.env.NEXT_PUBLIC_PROTOCOL)
console.log(`NEXT_PUBLIC_API_URL-slice`, process.env.NEXT_PUBLIC_API_URL)

// todo infinite loading... add try catch
export const fetchPaintings = createAsyncThunk(
  'paintings/fetchPaintings',
  async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/paintings`)
    if (!response.ok) {
      throw new Error('Failed to fetch paintings')
    }
    return await response.json()
  }
)

interface PaintingsState {
  paintings: { data: IPainting[]; total: number }
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
