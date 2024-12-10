import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { API_BASE_URL } from '@/src/shared/config/apiConfig'

interface Event {
  id: number
  title: string
  content: string
  date: string
  imgUrl: string
  createdAt: string
  updatedAt: string
  priority: number
}

interface EventsState {
  events: {
    data: Event[]
    total: number
  }
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: EventsState = {
  events: { data: [], total: 0 },
  loading: 'idle',
  error: null,
}

// Асинхронный экшен для получения событий
export const fetchEventsAction = createAsyncThunk<
  { data: Event[]; total: number },
  { page: number; limit: number }
>('events/fetchEvents', async ({ page, limit }, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/events?page=${page}&limit=${limit}`
    )
    if (!response.ok) {
      throw new Error('Failed to fetch events')
    }
    return await response.json()
  } catch (error) {
    return rejectWithValue('Failed to load data')
  }
})

// Слайс для работы с событиями
export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventsAction.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(
        fetchEventsAction.fulfilled,
        (state, action: PayloadAction<{ data: Event[]; total: number }>) => {
          state.loading = 'succeeded'
          state.events.data = action.payload.data
          state.events.total = action.payload.total
        }
      )
      .addCase(fetchEventsAction.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload as string
      })
  },
})

export default eventsSlice.reducer
