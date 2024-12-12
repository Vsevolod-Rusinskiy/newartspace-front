'use client'

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { API_BASE_URL } from '@/src/shared/config/apiConfig'

export interface IEvent {
  id: string
  title: string
  content: string
  date: string
  imgUrl: string
  priority: number
}

interface EventState {
  event: IEvent | null
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null | undefined
}

// Асинхронный экшен для получения события по ID
export const fetchEventByIdAction = createAsyncThunk<IEvent, string>(
  'events/fetchEventById',
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/events/${eventId}`)
      if (!response.ok) {
        if (response.status === 404) {
          return rejectWithValue('Event not found')
        }
        return rejectWithValue('Failed to fetch event')
      }
      return await response.json()
    } catch (error) {
      return rejectWithValue('Failed to load data')
    }
  }
)

const initialState: EventState = {
  event: null,
  loading: 'idle',
  error: null,
}

// Слайс для работы с данными события
export const eventSlice = createSlice<
  EventState,
  Record<string, never>,
  string,
  any // eslint-disable-line @typescript-eslint/no-explicit-any
>({
  name: 'event',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventByIdAction.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(
        fetchEventByIdAction.fulfilled,
        (state, action: PayloadAction<IEvent>) => {
          state.loading = 'succeeded'
          state.event = action.payload
        }
      )
      .addCase(fetchEventByIdAction.rejected, (state, action) => {
        state.loading = 'failed'
        state.error =
          (action.payload as string | undefined) || action.error.message || null
      })
  },
})

export default eventSlice.reducer
