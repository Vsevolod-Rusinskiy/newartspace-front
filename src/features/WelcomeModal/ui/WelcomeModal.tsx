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

const PHONE_NUMBER = '+79219326215'

const MODAL_CONTENT = `В марте Галерея открыта с пнд по птн с 13.00-17.00,
или в другое время / день по предварительной договоренности `

const MODAL_FOOTER = 'Приносим свои извинения.\n\nБудем рады Вас видеть!'

export const WelcomeModal = () => {
  const dispatch = useAppDispatch()
  const { hasSeenWelcomeModal, isOpen, isInitialized, messageHash } =
    useAppSelector((state) => state.welcomeModal)
  const [isClosing, setIsClosing] = useState(false)
  const [shouldShow, setShouldShow] = useState(true)

  useEffect(() => {
    const initModal = async () => {
      const currentHash = await generateHash(
        MODAL_CONTENT + PHONE_NUMBER + MODAL_FOOTER
      )
      dispatch(initializeState(currentHash))
    }
    initModal()
  }, [dispatch])

  useEffect(() => {
    const checkHash = async () => {
      const currentHash = await generateHash(
        MODAL_CONTENT + PHONE_NUMBER + MODAL_FOOTER
      )
      setShouldShow(!hasSeenWelcomeModal || messageHash !== currentHash)
    }
    checkHash()
  }, [hasSeenWelcomeModal, messageHash])

  const handleClose = async () => {
    setIsClosing(true)
    const hash = await generateHash(MODAL_CONTENT + PHONE_NUMBER + MODAL_FOOTER)
    setTimeout(() => {
      dispatch(setHasSeenWelcomeModal(hash))
      setIsClosing(false)
    }, 500)
  }

  if (!isInitialized || !shouldShow || !isOpen) {
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
            <h2>Добро пожаловать в Галерею !</h2>
            <p className={styles.schedule}>
              {MODAL_CONTENT}
              <a href={`tel:${PHONE_NUMBER}`} className={styles.phone_link}>
                {PHONE_NUMBER}
              </a>
              .
              <br />
              <br />
              {MODAL_FOOTER}
            </p>
            <p className={styles.address}>
              Санкт-Петербург, ул. Ново-рыбинская, д. 19-21,
              <br />
              ЦБ и Т «Квартал», 2 эт., зал 9
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
