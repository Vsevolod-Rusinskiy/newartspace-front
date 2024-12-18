'use client'

import { useGetAuthDataFromLS } from '@/src/shared/hooks/useGetAuthDataFromLS'
import '../../temp/styles.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { API_BASE_URL } from '@/src/shared/config/apiConfig'
import { useRemoveUserDataFromLSAndState } from '@/src/shared/hooks/useRemoveUserDataFromLSAndState'
import { AxiosError } from 'axios'
import instance from '@/src/shared/config/axios/instatnce'
export const ProfilePage = () => {
  const authDataFromLS = useGetAuthDataFromLS()
  const removeUserData = useRemoveUserDataFromLSAndState()
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    handleGetUserData()
  }, [])

  const handleGetUserData = async () => {
    try {
      const response = await instance.get(`/profile`, {
        headers: {
          Authorization: `Bearer ${authDataFromLS.accessToken}`,
        },
      })
      // console.log(response, 666)
      setUserData(response.data)
    } catch (error) {
      console.error('Ошибка при получении данных пользователя:', error)
      const errorData = error as AxiosError
      console.log(errorData.response?.data.message, 666)
      // запрос на фреш
      refreshToken()
    }
  }

  const refreshToken = async () => {
    // console.log(999999)
    // console.log(authDataFromLS.refreshToken, 8888)
    if (!authDataFromLS.refreshToken) {
      return
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
        refreshToken: authDataFromLS.refreshToken, // TODO: эксесс или рефреш?
      })
      console.log(response, 'refreshToken', 666)

      if (response.status === 200) {
        localStorage.setItem(
          'auth',
          JSON.stringify({
            ...response.data,
          })
        )
        return response.data.accessToken
      } else {
        removeUserData()
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
