'use client'
import cn from 'classnames'
import styles from './SortSpan.module.scss'

interface SortSpanProps {
  text: string
  isActive?: boolean
  onClick: () => void
}

export const SortSpan = ({
  text,
  isActive = false,
  onClick,
}: SortSpanProps) => {
  return (
    <span
      className={cn(styles.sort_span, {
        [styles.active]: isActive,
      })}
      onClick={onClick}
    >
      {text}
    </span>
  )
}
