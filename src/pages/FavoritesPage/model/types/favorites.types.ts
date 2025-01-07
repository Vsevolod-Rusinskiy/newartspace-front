import { IPainting } from '@/src/entities/Painting'

export interface FavoritesState {
  items: IPainting[]
  isLoading: boolean
  error: string | null
}
