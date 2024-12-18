'use client'

import '../../temp/styles.css'
import { useEffect, useState } from 'react'
import createAxiosInstance from '@/src/shared/config/axios/axiosInstatnce'
import { useAppDispatch } from '@/src/app/model/redux/hooks'
import {
  removeUserDataFromLS,
  getAuthDataFromLS,
} from '@/src/shared/lib/common'

export const ProfilePage = () => {
  const dispatch = useAppDispatch()
  const axiosInstance = createAxiosInstance(dispatch)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    handleGetUserData()
  }, [])

  const handleGetUserData = async () => {
    try {
      const response = await axiosInstance.get(`/profile`, {
        headers: {
          Authorization: `Bearer ${getAuthDataFromLS('auth').accessToken}`,
        },
      })
      // console.log(response, 666)
      setUserData(response.data)
    } catch (error) {
      console.error('Ошибка при получении данных пользователя:', error)
      // const errorData = error as AxiosError
      // console.log(errorData, 666)
      // запрос на фреш
      refreshToken()
    }
  }

  const refreshToken = async () => {
    // console.log(999999)
    // console.log(authDataFromLS.refreshToken, 8888)
    if (!getAuthDataFromLS('auth').refreshToken) {
      return
    }
    try {
      const response = await axiosInstance.post(`/auth/refresh`, {
        refreshToken: getAuthDataFromLS('auth').refreshToken, // TODO: эксесс или рефреш?
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
        removeUserDataFromLS('auth')
      }
    } catch (error) {
      console.error('Ошибка при обновлении токена:', error)
    }
  }

  return (
    <div className='outerContainer'>
      <div className='innerContainer'>
        <p>Страница личного кабинета в разработке . . .</p>
        <div className='userDataContainer'>
          {userData && JSON.stringify(userData, null, 2)}
        </div>
      </div>
    </div>
  )
}
