import { FC } from 'react'
import styles from './FilterBadge.module.scss'
import classNames from 'classnames'

interface FilterBadgeProps {
  isVisible: boolean
  className?: string
}

export const FilterBadge: FC<FilterBadgeProps> = ({ isVisible, className }) => {
  if (!isVisible) return null

  return <span className={classNames(styles.filter_badge, className)} />
}
