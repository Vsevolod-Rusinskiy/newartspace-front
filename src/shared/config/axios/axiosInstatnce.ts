import axios from 'axios'
import { refreshJwt } from './refreshJwt'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://back.newartspace.ru',
})

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.data.message === 'jwt expired') {
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
