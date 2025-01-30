import { API_BASE_URL } from '@/src/shared/config/apiConfig'
import axiosInstance from '@/src/shared/config/axios/axiosInstatnce'
import { getAuthDataFromLS } from '@/src/shared/lib/common'

// Получение избранного с сервера
export const getFavoritesFromServer = async () => {
  console.log('🔵 Запрашиваем избранное с сервера...')

  const authData = getAuthDataFromLS('auth')
  const response = await axiosInstance.get(`/user/favorites`, {
    headers: {
      Authorization: `Bearer ${authData?.accessToken}`,
    },
  })

  if (!response.ok) {
    console.error(
      '🔴 Ошибка при получении избранного:',
      response.status,
      response.statusText
    )
    throw new Error('Failed to fetch favorites from server')
  }

  const data = response.data
  console.log('✅ Получили с сервера избранное:', data)
  return data
}

// Обновление избранного на сервере
export const updateFavoritesOnServer = async (favoriteIds: number[]) => {
  console.log('🔵 Отправляем на сервер избранное:', favoriteIds)

  const authData = getAuthDataFromLS('auth')
  const response = await axiosInstance.post(
    `${API_BASE_URL}/user/favorites`,
    {
      favoriteIds,
    },
    {
      headers: {
        Authorization: `Bearer ${authData?.accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  )

  if (!response.ok) {
    console.error(
      '🔴 Ошибка при обновлении избранного:',
      response.status,
      response.statusText
    )
    throw new Error('Failed to update favorites on server')
  }

  const data = response.data
  console.log('✅ Сервер подтвердил обновление избранного:', data)
  return data
}
