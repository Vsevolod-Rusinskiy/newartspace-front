'use client'

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/src/app/model/redux/hooks'
import cn from 'classnames'
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
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    console.log('Initializing state')
    dispatch(initializeState())
  }, [dispatch])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      dispatch(setHasSeenWelcomeModal())
      setIsClosing(false)
    }, 500)
  }

  if (!isInitialized || hasSeenWelcomeModal || !isOpen) {
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
