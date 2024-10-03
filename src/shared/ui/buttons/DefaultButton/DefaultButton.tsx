import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'
import styles from './DefaultButton.module.scss'
import cn from 'classnames'

interface DefaultButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  onClick?: () => void
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
    className={cn(styles.default_button, className, {
      [styles.hidden]: !isVisible,
    })}
    onClick={onClick}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
)
