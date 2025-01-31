import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { API_BASE_URL } from '@/src/shared/config/apiConfig'
import { IPainting } from '@/src/entities/Painting'
import {
  getFavoritesFromServer,
  updateFavoritesOnServer,
} from './api/favoritesApi'

interface FavoritesState {
  favoriteIds: number[]
  favoritePaintings: {
    data: IPainting[]
    total: number
  }
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null | undefined
  isInitialized: boolean
  isSyncing: boolean
}

const getFavoritesFromStorage = (): number[] => {
  if (typeof window !== 'undefined') {
    const favorites = localStorage.getItem('favorites')
    return favorites ? JSON.parse(favorites).map(Number) : []
  }
  return []
}

export const fetchFavoritePaintings = createAsyncThunk<IPainting[], void>(
  'favorites/fetchFavoritePaintings',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { favorites: FavoritesState }
      const { favoriteIds } = state.favorites

      if (!favoriteIds.length) return []

      const response = await fetch(
        `${API_BASE_URL}/paintings/getMany/${favoriteIds.join(',')}`
      )

      if (!response.ok) {
        return rejectWithValue('Failed to fetch favorite paintings')
      }

      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue('Failed to load favorite paintings')
    }
  }
)

export const syncFavoritesWithServer = createAsyncThunk(
  'favorites/syncWithServer',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { favorites: FavoritesState }
      const { favoriteIds } = state.favorites

      const response = await updateFavoritesOnServer(favoriteIds)
      return response
    } catch (error) {
      return rejectWithValue('Failed to sync favorites with server')
    }
  }
)

export const fetchServerFavorites = createAsyncThunk(
  'favorites/fetchFromServer',
  async (_, { rejectWithValue }) => {
    try {
      const serverFavorites = await getFavoritesFromServer()
      return serverFavorites
    } catch (error) {
      return rejectWithValue('Failed to fetch favorites from server')
    }
  }
)

const initialState: FavoritesState = {
  favoriteIds: [],
  favoritePaintings: {
    data: [],
    total: 0,
  },
  loading: 'idle',
  error: null,
  isInitialized: false,
  isSyncing: false,
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    initializeFavorites: (state) => {
      if (!state.isInitialized) {
        state.favoriteIds = getFavoritesFromStorage()
        state.isInitialized = true
      }
    },
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const id = action.payload
      const index = state.favoriteIds.indexOf(id)

      if (index === -1) {
        state.favoriteIds.push(id)
      } else {
        state.favoriteIds.splice(index, 1)
        state.favoritePaintings.data = state.favoritePaintings.data.filter(
          (painting) => Number(painting.id) !== id
        )
        state.favoritePaintings.total = state.favoritePaintings.data.length
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('favorites', JSON.stringify(state.favoriteIds))
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoritePaintings.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(fetchFavoritePaintings.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.favoritePaintings.data = action.payload
        state.favoritePaintings.total = action.payload.length
      })
      .addCase(fetchFavoritePaintings.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload as string
      })
      .addCase(syncFavoritesWithServer.pending, (state) => {
        state.isSyncing = true
      })
      .addCase(syncFavoritesWithServer.fulfilled, (state) => {
        state.isSyncing = false
        state.error = null
      })
      .addCase(syncFavoritesWithServer.rejected, (state, action) => {
        state.isSyncing = false
        state.error = action.payload as string
      })
      .addCase(fetchServerFavorites.fulfilled, (state, action) => {
        const serverFavoriteIds = action.payload.favorites
        const localFavoriteIds = getFavoritesFromStorage()

        state.favoriteIds = Array.from(
          new Set([...localFavoriteIds, ...serverFavoriteIds])
        )

        if (typeof window !== 'undefined') {
          localStorage.setItem('favorites', JSON.stringify(state.favoriteIds))
        }
      })
  },
})

export const { initializeFavorites, toggleFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer
