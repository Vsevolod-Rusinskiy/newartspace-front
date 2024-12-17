'use client'

import { useGetAuthDataFromLS } from '@/src/shared/hooks/useGetAuthDataFromLS'
import '../../temp/styles.css'
import axios from 'axios'
import { useEffect } from 'react'
import { API_BASE_URL } from '@/src/shared/config/apiConfig'
import { useRemoveUserDataFromLSAndState } from '@/src/shared/hooks/useRemoveUserDataFromLSAndState'

export const ProfilePage = () => {
  const authData = useGetAuthDataFromLS()
  const removeUserData = useRemoveUserDataFromLSAndState()
  useEffect(() => {
    handleGetUserDate()
  }, [])

  const handleGetUserDate = async () => {
    try {
      console.log(authData.accessToken, 'accessToken')
      const response = await axios.get(`${API_BASE_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${authData.accessToken}`,
        },
      })
      console.log(response, 666)
    } catch (error) {
      console.error('Ошибка при получении данных пользователя:', error)
      refreshToken()
    }
  }

  const refreshToken = async () => {
    console.log(999999)
    console.log(authData.refreshToken, 8888)
    if (!authData.refreshToken) {
      return
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
        refreshToken: authData.refreshToken, // TODO: эксесс или рефреш?
      })
      console.log(response, 'refreshToken', 666)

      if (response.status === 200) {
        localStorage.setItem(
          'authData',
          JSON.stringify({
            ...authData,
            userName: response.data.userName,
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
        Страница личного кабинета в разработке . . .
      </div>
    </div>
  )
}
