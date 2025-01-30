import { API_BASE_URL } from '@/src/shared/config/apiConfig'

// Получение избранного с сервера
export const getFavoritesFromServer = async () => {
  console.log('🔵 Запрашиваем избранное с сервера...')

  const response = await fetch(`${API_BASE_URL}/user/favorites`)

  if (!response.ok) {
    console.error(
      '🔴 Ошибка при получении избранного:',
      response.status,
      response.statusText
    )
    throw new Error('Failed to fetch favorites from server')
  }

  const data = await response.json()
  console.log('✅ Получили с сервера избранное:', data)
  return data
}

// Обновление избранного на сервере
export const updateFavoritesOnServer = async (favoriteIds: number[]) => {
  console.log('🔵 Отправляем на сервер избранное:', favoriteIds)

  const response = await fetch(`${API_BASE_URL}/user/favorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ favoriteIds }),
  })

  if (!response.ok) {
    console.error(
      '🔴 Ошибка при обновлении избранного:',
      response.status,
      response.statusText
    )
    throw new Error('Failed to update favorites on server')
  }

  const data = await response.json()
  console.log('✅ Сервер подтвердил обновление избранного:', data)
  return data
}
