'use client'

import '../../temp/styles.css'
import { useEffect, useState } from 'react'
import { getAuthDataFromLS } from '@/src/shared/lib/common'
import createAxiosInstance from '@/src/shared/config/axios/axiosInstatnce'
export const ProfilePage = () => {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    handleGetUserData()
  }, [])

  const handleGetUserData = async () => {
    try {
      const response = await createAxiosInstance().get(`/profile`, {
        headers: {
          Authorization: `Bearer ${getAuthDataFromLS('auth').accessToken}`,
        },
      })
      console.log(response, 111, 'данные получены')
      setUserData(response.data)
    } catch (error) {
      // перехватываем ошибку в интерсептере axios
      console.error('Ошибка при получении данных пользователя:', error)
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
