import { removeUserDataFromLS } from '../../lib/common'
import { getAuthDataFromLS } from '../../lib/common'
import axiosInstance from './axiosInstatnce'

export const refreshJwt = async () => {
  if (!getAuthDataFromLS('auth').refreshToken) {
    return
  }
  try {
    const response = await axiosInstance.post(`/auth/refresh`, {
      refreshToken: getAuthDataFromLS('auth').refreshToken,
    })

    // const oldToken = getAuthDataFromLS('auth')

    if (response.status === 200) {
      localStorage.setItem(
        'auth',
        JSON.stringify({
          ...response.data,
        })
      )
      return response.data.accessToken
    } else {
      removeUserDataFromLS('auth')
    }
  } catch (error) {
    console.error('Ошибка при обновлении токена:', error)
  }
}
