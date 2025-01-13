import { FC } from 'react'
import styles from './CountBadge.module.scss'
import classNames from 'classnames'

interface CountBadgeProps {
  count: number
  className?: string
}

export const CountBadge: FC<CountBadgeProps> = ({ count, className }) => {
  return (
    <span className={classNames(styles.count_badge, className)}>{count}</span>
  )
}
