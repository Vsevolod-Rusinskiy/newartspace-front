import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_BASE_URL } from '@/src/shared/config/apiConfig'

interface IArtist {
  id: string
  artistName: string
  artistDescription: string
  imgUrl: string
  paintings: []
}

interface ArtistsState {
  artists: { data: IArtist[]; total: number }
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null | undefined
}

interface Pagination {
  page: number
  limit: number
  letter?: string
}

interface FetchArtistsResult {
  data: IArtist[]
  total: number
}

export const fetchArtistsAction = createAsyncThunk<
  FetchArtistsResult,
  Pagination
>(
  'artists/fetchArtists',
  async ({ page, limit, letter }: Pagination, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/artists?page=${page}&limit=${limit}${letter ? `&letter=${letter}` : ''}`
      )
      if (!response.ok) {
        return rejectWithValue('Failed to fetch artists')
      }
      return await response.json()
    } catch (error) {
      return rejectWithValue('Failed to load data')
    }
  }
)

export const initialState: ArtistsState = {
  artists: { data: [], total: 0 },
  loading: 'idle',
  error: null,
}
/* eslint-disable indent */
export const artistsSlice = createSlice<
  ArtistsState,
  {
    updateNamesPageData: (
      state: ArtistsState,
      action: { payload: IArtist[] }
    ) => void
  },
  string,
  any // eslint-disable-line @typescript-eslint/no-explicit-any
>({
  name: 'artists',
  initialState,
  reducers: {
    updateNamesPageData: (state, action) => {
      state.artists.data = action.payload
      state.artists.total = action.payload.length
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtistsAction.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(fetchArtistsAction.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        if (action.meta.arg.page === 1) {
          state.artists.data = action.payload.data
        } else {
          state.artists.data = [...state.artists.data, ...action.payload.data]
        }
        state.artists.total = action.payload.total
      })
      .addCase(fetchArtistsAction.rejected, (state, action) => {
        state.loading = 'failed'
        state.error =
          (action.payload as string | undefined) || action.error.message || null
      })
  },
})
/* eslint-enable indent */
export const { updateNamesPageData } = artistsSlice.actions

export default artistsSlice.reducer
