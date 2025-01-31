import axiosInstance from '@/src/shared/config/axios/axiosInstatnce'
import { getAuthDataFromLS } from '@/src/shared/lib/common'

// Получение корзины с сервера
export const getCartFromServer = async () => {
  console.log('🔵 Запрашиваем корзину с сервера...')

  const authData = getAuthDataFromLS('auth')
  const userId = authData?.userId

  if (!userId) {
    console.error('🔴 Ошибка: userId не найден в localStorage')
    throw new Error('UserId not found')
  }

  try {
    const response = await axiosInstance.get(`/user-paintings/${userId}`)
    console.log('✅ Получили с сервера ответ:', response.data)

    if (!response.data || !Array.isArray(response.data.cart)) {
      console.error('🔴 Неверный формат ответа сервера')
      throw new Error('Invalid server response format')
    }

    return response.data
  } catch (error) {
    console.error('🔴 Ошибка при получении корзины:', error)
    throw error
  }
}

// Обновление корзины на сервере
export const updateCartOnServer = async (
  cartIds: number[],
  currentFavorites: number[]
) => {
  console.log('🔵 Отправляем на сервер корзину:', cartIds)
  console.log('🔵 Текущие избранные:', currentFavorites)

  const authData = getAuthDataFromLS('auth')
  const userId = authData?.userId

  if (!userId) {
    console.error('🔴 Ошибка: userId не найден в localStorage')
    throw new Error('UserId not found')
  }

  try {
    const response = await axiosInstance.put(`/user-paintings/${userId}`, {
      favorites: currentFavorites,
      cart: cartIds,
    })

    console.log('✅ Сервер подтвердил обновление корзины:', response.data)
    return response.data
  } catch (error) {
    console.error('🔴 Ошибка при обновлении корзины:', error)
    throw error
  }
}
