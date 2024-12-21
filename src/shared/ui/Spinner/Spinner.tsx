'use client'

import { useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './Spinner.module.scss'
interface SpinnerProps {
  delay?: number
  className?: string
}

export const Spinner = ({ delay = 500, className }: SpinnerProps) => {
  const [showSpinner, setShowSpinner] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(true)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [delay])

  if (!showSpinner) {
    return null
  }

  return <div className={cn(styles.spinner, className)} />
}
