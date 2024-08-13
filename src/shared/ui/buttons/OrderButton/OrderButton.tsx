import styles from './OrderButton.module.scss'

interface IPrimaryButtonProps {
  label?: string
  onClick?: () => void
  disabled?: boolean
}

const orderButton = ({
  label,
  onClick,
  disabled = false,
}: IPrimaryButtonProps) => (
  <button
    className={styles.order_one_click_button}
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </button>
)

export default orderButton
