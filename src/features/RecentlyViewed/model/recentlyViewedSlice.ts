import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { API_BASE_URL } from '@/src/shared/config/apiConfig'
import { IPainting } from '@/src/entities/Painting'

interface RecentlyViewedItem {
  id: number
  timestamp: number
}

interface RecentlyViewedState {
  viewedIds: RecentlyViewedItem[]
  viewedPaintings: {
    data: IPainting[]
    total: number
  }
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null
  isInitialized: boolean
}

const MAX_RECENTLY_VIEWED = 20

const getRecentlyViewedFromStorage = (): RecentlyViewedItem[] => {
  if (typeof window !== 'undefined') {
    const recentlyViewed = localStorage.getItem('recentlyViewed')
    return recentlyViewed ? JSON.parse(recentlyViewed) : []
  }
  return []
}

export const fetchRecentlyViewedPaintings = createAsyncThunk<
  IPainting[],
  number | undefined
>(
  'recentlyViewed/fetchPaintings',
  async (excludeId, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { recentlyViewed: RecentlyViewedState }
      const { viewedIds } = state.recentlyViewed

      if (!viewedIds.length) return []

      // Sort by timestamp (newest first) and get IDs
      const sortedIds = [...viewedIds]
        .sort((a, b) => b.timestamp - a.timestamp)
        .map((item) => item.id)
        .filter((id) => id !== excludeId)

      if (!sortedIds.length) return []

      const response = await fetch(
        `${API_BASE_URL}/paintings/getMany/${sortedIds.join(',')}`
      )

      if (!response.ok) {
        return rejectWithValue('Failed to fetch recently viewed paintings')
      }

      const data = await response.json()

      // Sort data by the order of sortedIds
      const sortedData = sortedIds
        .map((id) => data.find((painting: IPainting) => painting.id === id))
        .filter(Boolean)

      return sortedData
    } catch (error) {
      return rejectWithValue('Failed to load recently viewed paintings')
    }
  }
)

const initialState: RecentlyViewedState = {
  viewedIds: [],
  viewedPaintings: {
    data: [],
    total: 0,
  },
  loading: 'idle',
  error: null,
  isInitialized: false,
}

const recentlyViewedSlice = createSlice({
  name: 'recentlyViewed',
  initialState,
  reducers: {
    initializeRecentlyViewed: (state) => {
      if (!state.isInitialized) {
        state.viewedIds = getRecentlyViewedFromStorage()
        state.isInitialized = true
      }
    },

    addToRecentlyViewed: (state, action: PayloadAction<number>) => {
      const id = action.payload
      const timestamp = Date.now()

      // Remove if already exists (to update position)
      state.viewedIds = state.viewedIds.filter((item) => item.id !== id)

      // Add to beginning
      state.viewedIds.unshift({ id, timestamp })

      // Limit size
      if (state.viewedIds.length > MAX_RECENTLY_VIEWED) {
        state.viewedIds = state.viewedIds.slice(0, MAX_RECENTLY_VIEWED)
      }

      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('recentlyViewed', JSON.stringify(state.viewedIds))
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentlyViewedPaintings.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(fetchRecentlyViewedPaintings.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.viewedPaintings.data = action.payload
        state.viewedPaintings.total = action.payload.length
      })
      .addCase(fetchRecentlyViewedPaintings.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload as string
      })
  },
})

export const { initializeRecentlyViewed, addToRecentlyViewed } =
  recentlyViewedSlice.actions
export default recentlyViewedSlice.reducer
