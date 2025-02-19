'use client'

import '../../temp/styles.css'
import { useEffect, useState } from 'react'
import {
  getAuthDataFromLS,
  removeUserDataFromLS,
} from '@/src/shared/lib/common'
import { useRouter } from 'next/navigation'
import { logout } from '@/src/features/Auth/sign-in/model/auth/authSlice'
import { useDispatch } from 'react-redux'
import { DefaultButton } from '@/src/shared/ui/buttons/DefaultButton/DefaultButton'
import { Spinner } from '@/src/shared/ui/Spinner/Spinner'
import { ProfileTabs } from '@/src/widgets/ProfileTabs'
import styles from './ProfilePage.module.scss'
import { Htag } from '@/src/shared/ui/Htag/Htag'
import cn from 'classnames'
import { UserProfileData } from '@/src/features/EditProfileForm'
import { profileApi } from '@/src/features/EditProfileForm/api/profile.api'

export const ProfilePage = () => {
  const [userData, setUserData] = useState<UserProfileData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  console.log(userData)

  useEffect(() => {
    const authData = getAuthDataFromLS('auth')
    if (!authData?.accessToken) {
      router.push('/auth')
      return
    }
    setIsAuthenticated(true)
  }, [router])

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isAuthenticated) return

      try {
        const data = await profileApi.getUserInfo()
        setUserData(data)
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
    <main className={styles.main}>
      <section className={`container ${styles.content}`}>
        <div className={styles.title_container}>
          <Htag tag='h1'>Личный кабинет</Htag>
        </div>
        <div className={styles.profile_container}>
          {userData && <ProfileTabs userData={userData} />}
          <DefaultButton
            className={cn('action_button', styles.logout_button)}
            onClick={handleLogout}
          >
            ВЫЙТИ
          </DefaultButton>
        </div>
      </section>
    </main>
  )
}
