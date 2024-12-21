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
import { Spinner } from '@/src/shared/ui/Spinner/Spinner'
import cn from 'classnames'

export const ProfilePage = () => {
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  // Проверка авторизации до первого рендера
  useEffect(() => {
    const authData = getAuthDataFromLS('auth')
    if (!authData?.accessToken) {
      router.push('/auth')
      return
    }
    setIsAuthenticated(true)
  }, [])

  // Загрузка данных пользователя только после проверки авторизации
  useEffect(() => {
    const fetchUserData = async () => {
      if (!isAuthenticated) return

      try {
        const authData = getAuthDataFromLS('auth')
        const response = await axiosInstance.get(`/profile`, {
          headers: {
            Authorization: `Bearer ${authData.accessToken}`,
          },
        })
        setUserData(response.data)
      } catch (error) {
        router.push('/auth')
        console.error('Ошибка при получении данных пользователя:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [isAuthenticated, router])

  const handleLogout = () => {
    removeUserDataFromLS('auth')
    dispatch(logout())
    router.push('/auth')
  }

  // Показываем спиннер до проверки авторизации и загрузки данных
  if (!isAuthenticated || isLoading) {
    return (
      <div className='outerContainer'>
        <div className='innerContainer'>
          <Spinner />
        </div>
      </div>
    )
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
