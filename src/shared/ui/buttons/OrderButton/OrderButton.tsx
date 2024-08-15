import styles from './OrderButton.module.scss'
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

interface IPrimaryButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label?: string
  onClick?: () => void
  disabled?: boolean
}

const orderButton = ({
  label,
  onClick,
  disabled = false,
  ...props
}: IPrimaryButtonProps) => (
  <button
    className={styles.order_one_click_button}
    onClick={onClick}
    disabled={disabled}
    {...props}
  >
    {label}
  </button>
)

export default orderButton
