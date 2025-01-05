import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'
import cn from 'classnames'
import { getClassNames } from '@/src/shared/lib/common'
import styles from './DefaultButton.module.scss'

interface DefaultButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  children: ReactNode
  isVisible?: boolean
}

export const DefaultButton = ({
  onClick,
  disabled = false,
  children,
  isVisible = true,
  className,
  ...props
}: DefaultButtonProps) => (
  <button
    className={cn(styles.default_button, getClassNames(className, styles), {
      [styles.hidden]: !isVisible,
    })}
    onClick={onClick}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
)
