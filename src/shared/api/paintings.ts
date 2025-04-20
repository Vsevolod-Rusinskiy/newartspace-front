import { API_BASE_URL } from '@/src/shared/config/apiConfig'
import { SortParams } from '@/src/widgets/SortSidebar/model/types'

export interface FilterItem {
  [key: number]: string
}

export interface Filters {
  [key: string]: (string | FilterItem)[]
}

export interface FetchPaintingsParams {
  page: number
  limit: number
  artStyle?: string | null
  filters?: Filters
  sort?: SortParams
}

export async function fetchPaintings(params: FetchPaintingsParams) {
  const searchParams = new URLSearchParams()
  searchParams.append('page', params.page.toString())
  searchParams.append('limit', params.limit.toString())
  if (params.artStyle) searchParams.append('artStyle', params.artStyle)
  if (params.filters)
    searchParams.append('filters', JSON.stringify(params.filters))
  if (params.sort) searchParams.append('sort', JSON.stringify(params.sort))

  const response = await fetch(
    `${API_BASE_URL}/paintings?${searchParams.toString()}`
  )
  if (!response.ok) {
    throw new Error('Failed to fetch paintings')
  }
  return response.json()
}
