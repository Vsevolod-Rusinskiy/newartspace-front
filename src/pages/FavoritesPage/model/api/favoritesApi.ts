import axiosInstance from '@/src/shared/config/axios/axiosInstatnce'
import { getAuthDataFromLS } from '@/src/shared/lib/common'

// Получение избранного с сервера
export const getFavoritesFromServer = async () => {
  const authData = getAuthDataFromLS('auth')
  const userId = authData?.userId

  if (!userId) {
    console.error('🔴 Ошибка: userId не найден в localStorage')
    throw new Error('UserId not found')
  }

  try {
    const response = await axiosInstance.get(`/user-paintings/${userId}`)
    return response.data
  } catch (error) {
    console.error('🔴 Ошибка при получении избранного:', error)
    throw new Error('Failed to fetch favorites from server')
  }
}

export const updateFavoritesOnServer = async (favoriteIds: number[]) => {
  const authData = getAuthDataFromLS('auth')
  const userId = authData?.userId

  if (!userId) {
    console.error('🔴 Ошибка: userId не найден в localStorage')
    throw new Error('UserId not found')
  }

  try {
    const response = await axiosInstance.put(`/user-paintings/${userId}`, {
      favorites: favoriteIds,
      cart: [],
    })

    return response.data
  } catch (error) {
    console.error('🔴 Ошибка при обновлении избранного:', error)
    throw new Error('Failed to update favorites on server')
  }
}
