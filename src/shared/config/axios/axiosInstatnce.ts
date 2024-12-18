import axios from 'axios'
import { refreshJwt } from './refreshJwt'
// import { logout } from '@/src/features/Auth/sign-in/model/auth/authSlice'

// console.log(dispatch, 111)

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://back.newartspace.ru',
})

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('есть ошибка', error.response.data.message, 222)
    if (error.response.data.message === 'jwt expired') {
      console.log(
        'ошибка jwt expired вызываем функцию обновления токена',
        error.response.data.message,
        333
      )
      const originalRequest = error.config
      const newToken = await refreshJwt()

      if (newToken) {
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`
        return axiosInstance(originalRequest)
      } else {
        console.error('Не удалось обновить токен')
      }
    } else {
      console.error('Ошибка сети:', error.message)
      // dispatch(logout())
    }
    return Promise.reject(error)
  }
)
export default axiosInstance
