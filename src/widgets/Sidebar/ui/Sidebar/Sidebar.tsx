'use client'
import { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { createPortal } from 'react-dom'
import styles from './Sidebar.module.scss'

// interface SidebarProps {}

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const portalRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    setIsClient(true)
    portalRef.current = document.body
  }, [])

  if (!isClient || !portalRef.current) return null

  const onToggle = () => {
    setCollapsed((prev) => !prev)
  }

  return createPortal(
    <>
      <button
        onClick={onToggle}
        style={{
          position: 'fixed',
          top: '10px',
          left: '10px',
          zIndex: 1100,
        }}
      >
        toggle
      </button>
      <div
        className={cn(styles.sidebar, {
          [styles.collapsed]: collapsed,
        })}
      >
        <div>Sidebar контент</div>
      </div>
    </>,
    portalRef.current as HTMLElement
  )
}
