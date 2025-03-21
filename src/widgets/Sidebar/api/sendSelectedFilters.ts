import { API_BASE_URL } from '@/src/shared/config/apiConfig'

type FilterItem = { [key: number]: string }

export const sendSelectedFilters = async (
  selectedFilters: {
    [key: string]: (string | FilterItem)[]
  },
  artStyle: string | null
) => {
  try {
    const params = new URLSearchParams()

    params.append('filters', JSON.stringify(selectedFilters))
    if (artStyle) {
      params.append('artStyle', artStyle)
    }

    const queryString = params.toString()
    console.log('URL запроса:', `${API_BASE_URL}/paintings?${queryString}`)

    const response = await fetch(`${API_BASE_URL}/paintings?${queryString}`, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error('Failed to send selected filters')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error sending selected filters:', error)
    throw error
  }
}
