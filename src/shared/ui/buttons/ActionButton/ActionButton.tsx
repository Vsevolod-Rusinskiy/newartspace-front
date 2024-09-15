import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'
import styles from './ActionButton.module.scss'
import cn from 'classnames'

interface IPrimaryButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  onClick?: () => void
  disabled?: boolean
  children: ReactNode
  isVisible?: boolean
}

export const ActionButton = ({
  onClick,
  disabled = false,
  children,
  isVisible = true,
  ...props
}: IPrimaryButtonProps) => (
  <button
    className={cn(styles.animated_button, { [styles.hidden]: !isVisible })}
    onClick={onClick}
    disabled={disabled}
    {...props}
  >
    <span />
    <span />
    <span />
    <span />
    {children}
  </button>
)
