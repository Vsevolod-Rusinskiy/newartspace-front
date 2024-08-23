'use client'

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

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

interface PaintingState {
  painting: IPainting | null
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null | undefined
}

// interface FetchPaintingsResult {
//   data: IPainting
// }

export const fetchPaintingByIdAction = createAsyncThunk<IPainting, string>(
  'paintings/fetchPaintingById',
  async (paintingCardId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/paintings/${paintingCardId}`
      )
      if (!response.ok) {
        if (response.status === 404) {
          return rejectWithValue('Painting not found')
        }
        return rejectWithValue('Failed to fetch painting')
      }
      return await response.json()
    } catch (error) {
      return rejectWithValue('Failed to load data')
    }
  }
)

const initialState: PaintingState = {
  painting: null,
  loading: 'idle',
  error: null,
}
// @ts-ignore
export const paintingSlice = createSlice<
  PaintingState,
  Record<string, never>,
  string,
  any // eslint-disable-line @typescript-eslint/no-explicit-any
>({
  name: 'painting',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaintingByIdAction.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(
        fetchPaintingByIdAction.fulfilled,
        (state, action: PayloadAction<IPainting>) => {
          state.loading = 'succeeded'
          state.painting = action.payload
        }
      )
      .addCase(fetchPaintingByIdAction.rejected, (state, action) => {
        state.loading = 'failed'
        state.error =
          (action.payload as string | undefined) || action.error.message || null
      })
  },
})

export default paintingSlice.reducer
