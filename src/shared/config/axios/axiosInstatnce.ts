import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://back.newartspace.ru',
})

const refreshToken = async () => {
  // console.log(999999)
  // console.log(authDataFromLS.refreshToken, 8888)
  if (!authDataFromLS.refreshToken) {
    return
  }
  try {
    const response = await axiosInstance.post(`/auth/refresh`, {
      refreshToken: authDataFromLS.refreshToken, // TODO: эксесс или рефреш?
    })
    console.log(response, 'refreshToken', 7777)

    if (response.status === 200) {
      localStorage.setItem(
        'auth',
        JSON.stringify({
          ...response.data,
        })
      )
      console.log('этокен обновлен', response.data.accessToken, 666)

      return response.data.accessToken
    } else {
      removeUserData()
    }
  } catch (error) {
    console.error('Ошибка при обновлении токена:', error)
  }
}

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error.response.data.message, 111)
    // const removeUserData = useRemoveUserDataFromLSAndState()
    if (error.response.data.message === 'jwt expired') {
      // Обработка ошибок на основе статуса

      refreshToken()
    } else {
      console.error('Ошибка сети:', error.message)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
