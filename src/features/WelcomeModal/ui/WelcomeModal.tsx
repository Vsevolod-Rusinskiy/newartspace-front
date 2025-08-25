'use client'

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/src/app/model/redux/hooks'
import cn from 'classnames'
import {
  setHasSeenWelcomeModal,
  initializeState,
} from '../model/welcomeModalSlice'
import styles from './WelcomeModal.module.scss'
import { generateHash } from '@/src/shared/lib/generateHash'
import PageTextBlock from '@/src/shared/ui/PageTextBlock/PageTextBlock'

interface IWelcomeMessage {
  content: string // HTML контент
  id: number // для отслеживания новых сообщений
  created_at: string // для сортировки
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const WelcomeModal = () => {
  const dispatch = useAppDispatch()
  const { hasSeenWelcomeModal, isOpen, isInitialized, messageHash } =
    useAppSelector((state) => state.welcomeModal)
  const [isClosing, setIsClosing] = useState(false)
  const [shouldShow, setShouldShow] = useState(true)
  const [welcomeMessage, setWelcomeMessage] = useState<IWelcomeMessage | null>(
    null
  )

  useEffect(() => {
    const fetchWelcomeMessage = async () => {
      try {
        console.log('Fetching welcome message from:', `${API_URL}/welcome`)
        const response = await fetch(`${API_URL}/welcome`)
        console.log('Raw response:', response)

        const responseData = await response.json()
        console.log('Parsed welcome message data:', responseData)

        // Проверяем наличие данных в правильной структуре
        if (responseData.data && responseData.data.length > 0) {
          const welcomeMessageData = responseData.data[0] // Берем первое сообщение из массива
          console.log('Welcome message:', welcomeMessageData)

          setWelcomeMessage(welcomeMessageData)
          const currentHash = await generateHash(
            welcomeMessageData.id.toString()
          )
          dispatch(initializeState(currentHash))
        } else {
          console.warn('No welcome message data received')
          dispatch(initializeState('')) // Используем пустую строку вместо null
        }
      } catch (error) {
        console.error('Failed to fetch welcome message:', error)
        dispatch(initializeState('')) // Используем пустую строку вместо null
      }
    }
    fetchWelcomeMessage()
  }, [dispatch])

  useEffect(() => {
    if (!welcomeMessage) return

    const checkHash = async () => {
      const currentHash = await generateHash(welcomeMessage.id.toString())
      console.log('Current message hash:', currentHash)
      console.log('Stored message hash:', messageHash)
      console.log('Has seen welcome modal:', hasSeenWelcomeModal)

      setShouldShow(!hasSeenWelcomeModal || messageHash !== currentHash)
      console.log(
        'Should show modal:',
        !hasSeenWelcomeModal || messageHash !== currentHash
      )
    }
    checkHash()
  }, [hasSeenWelcomeModal, messageHash, welcomeMessage])

  const handleClose = async () => {
    if (!welcomeMessage) return

    setIsClosing(true)
    const hash = await generateHash(welcomeMessage.id.toString())
    setTimeout(() => {
      dispatch(setHasSeenWelcomeModal(hash))
      setIsClosing(false)
    }, 500)
  }

  if (!isInitialized || !shouldShow || !isOpen || !welcomeMessage) {
    return null
  }

  return (
    <div
      className={cn(styles.welcome_modal_wrapper, {
        [styles.closing]: isClosing,
      })}
    >
      <div className={styles.overlay} onClick={handleClose}>
        <div
          className={styles.modal_content}
          onClick={(e) => e.stopPropagation()}
        >
          <button className={styles.close_button} onClick={handleClose} />
          <div className={styles.content}>
            <PageTextBlock
              text={welcomeMessage.content}
              className={styles.schedule}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
