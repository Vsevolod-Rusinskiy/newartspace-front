'use client'

import { useQuery } from '@tanstack/react-query'
import { getFavoritePaintings } from './favoritesApi'
import { IPainting } from '@/src/entities/Painting'

export const useFavoritePaintings = (ids: string[]) => {
  return useQuery<IPainting[]>({
    queryKey: ['favoritePaintings', ids],
    queryFn: () => getFavoritePaintings(ids),
    enabled: ids.length > 0,
    staleTime: 5 * 60 * 1000, // 5 минут
  })
}
