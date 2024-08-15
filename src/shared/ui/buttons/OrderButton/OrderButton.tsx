import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'
import styles from './OrderButton.module.scss'

interface IPrimaryButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  onClick?: () => void
  disabled?: boolean
  children: ReactNode
}

const orderButton = ({
  onClick,
  disabled = false,
  children,
  ...props
}: IPrimaryButtonProps) => (
  <button
    className={styles.animated_button}
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

export default orderButton
