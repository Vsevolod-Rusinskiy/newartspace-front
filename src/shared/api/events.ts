import { API_BASE_URL } from '@/src/shared/config/apiConfig'

export interface EventPhoto {
  id: number
  imgUrl: string
  priority: number
  title: string
  createdAt: string
  updatedAt: string
  eventId: number
}

export interface Event {
  id: number
  title: string
  content: string
  date: string
  imgUrl: string
  createdAt: string
  updatedAt: string
  priority: number
  eventPhotos: EventPhoto[]
}

export interface FetchEventsParams {
  page: number
  limit: number
}

export interface FetchEventsResult {
  data: Event[]
  total: number
}

export async function fetch_events({
  page,
  limit,
}: FetchEventsParams): Promise<FetchEventsResult> {
  const response = await fetch(
    `${API_BASE_URL}/events?page=${page}&limit=${limit}`
  )
  if (!response.ok) {
    throw new Error('Failed to fetch events')
  }
  return response.json()
}
