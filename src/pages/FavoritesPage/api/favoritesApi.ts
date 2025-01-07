import { IPainting } from '@/src/entities/Painting'
import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const getFavoritePaintings = async (
  ids: string[]
): Promise<IPainting[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/paintings`, {
      params: {
        ids: ids.join(','),
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching favorite paintings:', error)
    return []
  }
}
