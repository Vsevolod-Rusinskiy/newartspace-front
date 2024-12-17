'use client'

import { useGetAuthDataFromLS } from '@/src/shared/hooks/useGetAuthDataFromLS'
import '../../temp/styles.css'
import axios from 'axios'
import { useEffect } from 'react'
import { API_BASE_URL } from '@/src/shared/config/apiConfig'

export const ProfilePage = () => {
  const authData = useGetAuthDataFromLS()

  useEffect(() => {
    handleGetUserDate()
  }, [])

  const handleGetUserDate = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${authData.accessToken}`,
        },
      })
      console.log(response)
    } catch (error) {
      console.error('Ошибка при получении данных пользователя:', error)
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
