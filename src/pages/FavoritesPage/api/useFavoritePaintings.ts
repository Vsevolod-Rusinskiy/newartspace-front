'use client'

import { useQuery } from 'react-query'
import axios from 'axios'
import { IPainting } from '@/src/entities/Painting'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const useFavoritePaintings = (favoriteIds: string[]) => {
  console.log('useFavoritePaintings called with ids:', favoriteIds)

  return useQuery<IPainting[]>(
    ['favoritePaintings', favoriteIds],
    async () => {
      if (!favoriteIds.length) {
        console.log('No favorite ids provided, returning empty array')
        return []
      }

      console.log('Fetching paintings with ids:', favoriteIds)
      const response = await axios.get(
        `${API_URL}/paintings/getMany/${favoriteIds.join(',')}`
      )
      console.log('API response:', response.data)
      return response.data
    },
    {
      enabled: favoriteIds.length > 0,
    }
  )
}
