import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FavoritesState {
  favoriteIds: string[]
  isInitialized: boolean
}

const getFavoritesFromStorage = (): string[] => {
  if (typeof window !== 'undefined') {
    const favorites = localStorage.getItem('favorites')
    return favorites ? JSON.parse(favorites) : []
  }
  return []
}

const initialState: FavoritesState = {
  favoriteIds: [],
  isInitialized: false,
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
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload
      const index = state.favoriteIds.indexOf(id)

      if (index === -1) {
        state.favoriteIds.push(id)
      } else {
        state.favoriteIds.splice(index, 1)
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('favorites', JSON.stringify(state.favoriteIds))
      }
    },
  },
})

export const { toggleFavorite, initializeFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer
