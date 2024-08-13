import React from 'react'
import styles from './OrderButton.module.scss'

interface IPrimaryButtonProps {
  label?: string
  onClick?: () => void
  disabled?: boolean
}

const orderButton: React.FC<IPrimaryButtonProps> = ({
  label,
  onClick,
  disabled = false,
}) => (
  <button
    className={styles.order_one_click_button}
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </button>
)

export default orderButton
