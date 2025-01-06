'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/src/app/model/redux/hooks'
import {
  setHasSeenWelcomeModal,
  initializeState,
} from '../model/welcomeModalSlice'
import styles from './WelcomeModal.module.scss'

export const WelcomeModal = () => {
  const dispatch = useAppDispatch()
  const { hasSeenWelcomeModal, isOpen, isInitialized } = useAppSelector(
    (state) => state.welcomeModal
  )

  useEffect(() => {
    console.log('Initializing state')
    dispatch(initializeState())
  }, [dispatch])

  const handleClose = () => {
    dispatch(setHasSeenWelcomeModal())
  }

  if (!isInitialized || hasSeenWelcomeModal || !isOpen) {
    console.log('Not rendering modal:', {
      isInitialized,
      hasSeenWelcomeModal,
      isOpen,
    })
    return null
  }

  console.log('Rendering modal')

  return (
    <div className={styles.welcome_modal_wrapper}>
      <div className={styles.overlay} onClick={handleClose}>
        <div
          className={styles.modal_content}
          onClick={(e) => e.stopPropagation()}
        >
          <button className={styles.close_button} onClick={handleClose} />
          <div className={styles.content}>
            <h2>Добро пожаловать!</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
