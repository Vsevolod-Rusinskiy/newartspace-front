'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { useAppDispatch, useAppSelector } from '@/src/app/model/redux/hooks'
import { actionCloseModal } from './model/modalVisibilitySlice'
import { CloseButton } from '@/src/shared/ui/buttons/CloseButton/CloseButton'
import styles from './Modal.module.scss'

const ANIMATION_DELAY = 300

interface ModalProps {
  children: React.ReactNode
}

export const Modal = ({ children }: ModalProps) => {
  const [isClosing, setIsClosing] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()
  const [isClient, setIsClient] = useState(false)
  const portalRef = useRef<HTMLElement | null>(null)
  const dispatch = useAppDispatch()

  const isOpen = useAppSelector((state) => state.modalVisibility.isOpened)

  const closeHandler = useCallback(() => {
    if (isOpen) {
      setIsClosing(true)
      timerRef.current = setTimeout(() => {
        dispatch(actionCloseModal())
        setIsClosing(false)
      }, ANIMATION_DELAY)
    }
  }, [isOpen, dispatch])

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeHandler()
      }
    },
    [closeHandler]
  )

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown)
    }

    return () => {
      clearTimeout(timerRef.current)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onKeyDown])

  useEffect(() => {
    setIsClient(true)
    portalRef.current = document.body
  }, [])

  const mods = {
    [styles.opened]: isOpen,
    [styles.isClosing]: isClosing,
  }

  if (!isClient || !portalRef.current) return null

  return (
    <>
      <div className={cn(styles.Modal, mods)}>
        <div className={styles.overlay} onClick={closeHandler}>
          <div className={styles.content} onClick={onContentClick}>
            <CloseButton
              className={styles.close_button}
              onClick={closeHandler}
            />
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
