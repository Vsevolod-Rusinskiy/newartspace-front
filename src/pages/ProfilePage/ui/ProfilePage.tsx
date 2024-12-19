'use client'

import '../../temp/styles.css'
import { useEffect, useState } from 'react'
import {
  getAuthDataFromLS,
  removeUserDataFromLS,
} from '@/src/shared/lib/common'
import axiosInstance from '@/src/shared/config/axios/axiosInstatnce'
import { useRouter } from 'next/navigation'
import { logout } from '@/src/features/Auth/sign-in/model/auth/authSlice'
import { useDispatch } from 'react-redux'
import { DefaultButton } from '@/src/shared/ui/buttons/DefaultButton/DefaultButton'
import cn from 'classnames'
export const ProfilePage = () => {
  const [userData, setUserData] = useState(null)
  const router = useRouter()
  const dispatch = useDispatch()

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
      console.log(response, 111, 'данные получены')
      setUserData(response.data)
    } catch (error) {
      // перехватываем ошибку в интерсептере axios
      router.push('/auth')
      console.error('Ошибка при получении данных пользователя:', error)
    }
  }

  const handleLogout = () => {
    // Логика выхода из кабинета
    removeUserDataFromLS('auth')
    dispatch(logout())
    router.push('/auth')
  }

  return (
    <div className='outerContainer'>
      <div className='innerContainer'>
        <p>Страница личного кабинета в разработке . . .</p>
        <div className='userDataContainer'>
          {userData && JSON.stringify(userData, null, 2)}
        </div>
        <DefaultButton
          className={cn('action_button', {})}
          onClick={handleLogout}
        >
          ВЫЙТИ
        </DefaultButton>
      </div>
    </div>
  )
}
