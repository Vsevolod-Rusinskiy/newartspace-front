'use client'
import { useState } from 'react'
import cn from 'classnames'
import { TabType } from '../../model/types/profile-tabs.types'
import styles from './ProfileTabs.module.scss'
import {
  EditProfileForm,
  EditProfileFormValues,
  UserProfileData,
} from '@/src/features/EditProfileForm'
import { profileApi } from '@/src/features/EditProfileForm/api/profile.api'
import { OrderHistory } from '@/src/features/OrderHistory'

interface ProfileTabsProps {
  userData: UserProfileData
}

const TABS: { id: TabType; title: string }[] = [
  { id: 'info', title: 'Личная информация' },
  { id: 'orders', title: 'История покупок' },
  { id: 'favorites', title: 'Избранное' },
]

export const ProfileTabs = ({ userData }: ProfileTabsProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('info')
  const [updateMessage, setUpdateMessage] = useState<string>('')

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab)
    setUpdateMessage('')
  }

  const handleProfileUpdate = async (data: EditProfileFormValues) => {
    try {
      const response = await profileApi.updateProfile(data)
      setUpdateMessage(response.message)
    } catch (error) {
      setUpdateMessage('Произошла ошибка при обновлении профиля')
      console.error('Ошибка при обновлении профиля:', error)
    }
  }

  return (
    <div className={styles.profile_tabs}>
      <div className={styles.tabs_header}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={cn(styles.tab_button, {
              [styles.active]: activeTab === tab.id,
            })}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className={styles.tab_content}>
        {updateMessage && (
          <div
            className={cn(styles.message, {
              [styles.error]: updateMessage.includes('ошибка'),
            })}
          >
            {updateMessage}
          </div>
        )}

        {activeTab === 'info' && (
          <EditProfileForm userData={userData} onSubmit={handleProfileUpdate} />
        )}
        {activeTab === 'orders' && <OrderHistory />}
        {activeTab === 'favorites' && <div>Компонент избранного</div>}
      </div>
    </div>
  )
}
