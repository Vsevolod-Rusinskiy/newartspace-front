import cn from 'classnames'
import styles from './CloseButton.module.scss'

interface CloseButtonProps {
  onClick: () => void
  className?: string
}

export const CloseButton = ({ onClick, className }: CloseButtonProps) => {
  return (
    <button onClick={onClick} className={cn(styles.close_button, className)} />
  )
}
