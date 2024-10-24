'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { useAppDispatch, useAppSelector } from '@/src/app/model/redux/hooks'
import { actionCloseModal } from './model/modalVisibilitySlice'
import styles from './Modal.module.scss'

const ANIMATION_DELAY = 300

export const Modal = () => {
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
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum
          </div>
        </div>
      </div>
    </>
  )
}
