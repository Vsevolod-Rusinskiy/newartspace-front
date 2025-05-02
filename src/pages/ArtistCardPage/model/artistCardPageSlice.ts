'use client'

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { API_BASE_URL } from '@/src/shared/config/apiConfig'

interface IArtist {
  id: string
  artistName: string
  artistDescription: string
  imgUrl: string
}

interface ArtistState {
  artist: IArtist | null
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null | undefined
}

// Асинхронный экшен для получения художника по ID
export const fetchArtistByIdAction = createAsyncThunk<IArtist, string>(
  'artists/fetchArtistById',
  async (artistId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/artists/${artistId}`)
      if (!response.ok) {
        if (response.status === 404) {
          return rejectWithValue('Artist not found')
        }
        return rejectWithValue('Failed to fetch artist')
      }
      return await response.json()
    } catch (error) {
      return rejectWithValue('Failed to load data')
    }
  }
)

const initialState: ArtistState = {
  artist: null,
  loading: 'idle',
  error: null,
}

// Слайс для работы с данными художника
/* eslint-disable indent */
export const artistSlice = createSlice({
  name: 'artist',
  initialState,
  reducers: {
    setArtistData: (state, action: PayloadAction<IArtist>) => {
      state.artist = action.payload
      state.loading = 'succeeded'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtistByIdAction.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(
        fetchArtistByIdAction.fulfilled,
        (state, action: PayloadAction<IArtist>) => {
          state.loading = 'succeeded'
          state.artist = action.payload
        }
      )
      .addCase(fetchArtistByIdAction.rejected, (state, action) => {
        state.loading = 'failed'
        state.error =
          (action.payload as string | undefined) || action.error.message || null
      })
  },
})
/* eslint-enable indent */

export const { setArtistData } = artistSlice.actions

export default artistSlice.reducer
