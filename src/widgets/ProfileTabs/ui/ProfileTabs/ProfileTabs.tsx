'use client'
import { useState } from 'react'
import cn from 'classnames'
import { TabType } from '../../model/types/profile-tabs.types'
import styles from './ProfileTabs.module.scss'

const TABS: { id: TabType; title: string }[] = [
  { id: 'password', title: 'Сменить пароль' },
  { id: 'orders', title: 'История покупок' },
  { id: 'favorites', title: 'Избранное' },
]

export const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState<TabType>('password')

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab)
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
        {activeTab === 'password' && <div>Компонент смены пароля</div>}
        {activeTab === 'orders' && <div>Компонент истории покупок</div>}
        {activeTab === 'favorites' && <div>Компонент избранного</div>}
      </div>
    </div>
  )
}
