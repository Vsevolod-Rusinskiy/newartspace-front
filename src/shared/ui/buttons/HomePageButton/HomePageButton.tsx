import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'
import styles from './HomePageButton.module.scss'
import cn from 'classnames'
import { getClassNames } from '@/src/shared/lib/common'

interface HomePageButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  onClick?: () => void
  disabled?: boolean
  children: ReactNode
  isVisible?: boolean
}

export const HomePageButton = ({
  onClick,
  disabled = false,
  children,
  isVisible = true,
  className,
  ...props
}: HomePageButtonProps) => (
  <button
    className={cn(styles.home_page_button, getClassNames(className, styles), {
      [styles.hidden]: !isVisible,
    })}
    onClick={onClick}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
)
