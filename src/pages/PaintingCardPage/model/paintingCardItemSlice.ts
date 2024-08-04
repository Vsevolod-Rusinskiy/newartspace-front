'use client'

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
  color: string
}

interface PaintingState {
  painting: IPainting | null
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null | undefined
}

export const fetchPaintingById = createAsyncThunk(
  'paintings/fetchPaintingById',
  async (paintingCardId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/paintings/${paintingCardId}`
      )
      if (!response.ok) {
        if (response.status === 404) {
          console.log('404')
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
export const paintingSlice = createSlice({
  name: 'painting',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaintingById.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(fetchPaintingById.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.painting = action.payload
      })
      .addCase(fetchPaintingById.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.error.message
      })
  },
})

export default paintingSlice.reducer
