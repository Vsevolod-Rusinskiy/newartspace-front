'use client'

import { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import cn from 'classnames'
import { listItemAnimations, animationPresets } from './animation'
import styles from './AnimatedList.module.scss'

interface AnimatedListProps {
  children: ReactNode
  className?: string
}

interface AnimatedListItemProps {
  children: ReactNode
  className?: string
  preset?: keyof typeof animationPresets
  customAnimation?: typeof listItemAnimations
}

export const AnimatedList = ({ children, className }: AnimatedListProps) => {
  return (
    <ul className={cn(styles.list, className)}>
      <AnimatePresence>{children}</AnimatePresence>
    </ul>
  )
}

export const AnimatedListItem = ({
  children,
  className,
  preset = 'fadeSlide',
  customAnimation,
}: AnimatedListItemProps) => {
  const animation =
    customAnimation || animationPresets[preset] || listItemAnimations

  return (
    <motion.li
      className={cn(styles.item, className)}
      initial={animation.initial}
      exit={animation.exit}
      layout
    >
      {children}
    </motion.li>
  )
}
