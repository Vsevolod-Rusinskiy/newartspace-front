import axios from 'axios'
// import { logout } from '@/src/features/Auth/sign-in/model/auth/authSlice'

const createAxiosInstance = (dispatch) => {
  console.log(dispatch, 111)

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://back.newartspace.ru',
  })

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log(error.response.data.message, 111)
      if (error.response.data.message === 'jwt expired') {
        // refreshToken()
        console.log(error.response.data.message, 111)
      } else {
        console.error('Ошибка сети:', error.message)
        // dispatch(logout())
      }
      return Promise.reject(error)
    }
  )

  return axiosInstance
}

export default createAxiosInstance
