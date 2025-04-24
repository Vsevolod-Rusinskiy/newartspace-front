import { API_BASE_URL } from '@/src/shared/config/apiConfig'

export interface IArtist {
  id: string
  artistName: string
  artistDescription: string
  imgUrl: string
  paintings: []
}

export interface FetchArtistsParams {
  page: number
  limit: number
  letter?: string
}

export interface FetchArtistsResult {
  data: IArtist[]
  total: number
}

export async function fetchArtists(
  params: FetchArtistsParams
): Promise<FetchArtistsResult> {
  const { page, limit, letter } = params
  const url = `${API_BASE_URL}/artists?page=${page}&limit=${limit}${letter ? `&letter=${letter}` : ''}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch artists')
  }
  return response.json()
}
