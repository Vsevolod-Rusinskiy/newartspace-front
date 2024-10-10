import { API_BASE_URL } from '@/src/shared/config/apiConfig'

export const sendSelectedFilters = async (selectedFilters: {
  [key: string]: number[]
}) => {
  try {
    const params = new URLSearchParams()

    // Преобразуем объект фильтров в JSON-строку
    params.append('filters', JSON.stringify(selectedFilters))

    const queryString = params.toString()
    console.log(queryString, 111)

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
