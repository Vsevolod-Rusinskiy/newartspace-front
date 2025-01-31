import axiosInstance from '@/src/shared/config/axios/axiosInstatnce'
import { getAuthDataFromLS } from '@/src/shared/lib/common'

// Получение избранного с сервера
export const getFavoritesFromServer = async () => {
  // console.log('🔵 Запрашиваем избранное с сервера...')

  const authData = getAuthDataFromLS('auth')
  const userId = authData?.userId

  if (!userId) {
    console.error('🔴 Ошибка: userId не найден в localStorage')
    throw new Error('UserId not found')
  }

  try {
    const response = await axiosInstance.get(`/user-paintings/${userId}`)
    // console.log('✅ Получили с сервера ответ:', response)
    // console.log('✅ Данные с сервера:', response.data)
    // console.log('✅ Тип данных:', typeof response.data)
    // console.log('✅ Это массив?', Array.isArray(response.data))
    return response.data
  } catch (error) {
    console.error('🔴 Ошибка при получении избранного:', error)
    throw new Error('Failed to fetch favorites from server')
  }
}

// Обновление избранного на сервере
export const updateFavoritesOnServer = async (favoriteIds: number[]) => {
  // console.log('🔵 Отправляем на сервер избранное:', favoriteIds)

  const authData = getAuthDataFromLS('auth')
  const userId = authData?.userId

  if (!userId) {
    console.error('🔴 Ошибка: userId не найден в localStorage')
    throw new Error('UserId not found')
  }

  try {
    const response = await axiosInstance.put(`/user-paintings/${userId}`, {
      favorites: favoriteIds,
      cart: [], // если у вас нет элементов в корзине, передайте пустой массив
    })

    // console.log('✅ Сервер подтвердил обновление избранного:', response.data)
    return response.data
  } catch (error) {
    console.error('🔴 Ошибка при обновлении избранного:', error)
    throw new Error('Failed to update favorites on server')
  }
}
