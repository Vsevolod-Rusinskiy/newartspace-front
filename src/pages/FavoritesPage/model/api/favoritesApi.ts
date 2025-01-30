import { API_BASE_URL } from '@/src/shared/config/apiConfig'

// Получение избранного с сервера
export const getFavoritesFromServer = async () => {
  const response = await fetch(`${API_BASE_URL}/user/favorites`)

  if (!response.ok) {
    throw new Error('Failed to fetch favorites from server')
  }

  return response.json()
}

// Обновление избранного на сервере
export const updateFavoritesOnServer = async (favoriteIds: number[]) => {
  const response = await fetch(`${API_BASE_URL}/user/favorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ favoriteIds }),
  })

  if (!response.ok) {
    throw new Error('Failed to update favorites on server')
  }

  return response.json()
}
