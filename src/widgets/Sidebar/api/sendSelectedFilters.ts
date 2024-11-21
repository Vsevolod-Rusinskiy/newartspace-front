import { API_BASE_URL } from '@/src/shared/config/apiConfig'

export const sendSelectedFilters = async (selectedFilters: {
  [key: string]: string[]
}) => {
  try {
    const params = new URLSearchParams()

    params.append('filters', JSON.stringify(selectedFilters))

    const queryString = params.toString()

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
