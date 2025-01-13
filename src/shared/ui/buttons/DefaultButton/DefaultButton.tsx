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
  priceType?: string
}

export const DefaultButton = ({
  onClick,
  disabled = false,
  children,
  isVisible = true,
  className,
  priceType,
  ...props
}: DefaultButtonProps) => {
  const shouldHideButton = priceType
    ? priceType === 'Оригинал куплен' ||
      priceType === 'Оригинал забронирован' ||
      priceType === 'Оригинал не продаётся' ||
      priceType === 'Возможна репродукция'
    : false

  const finalIsVisible = isVisible && !shouldHideButton

  return (
    <button
      className={cn(styles.default_button, getClassNames(className, styles), {
        [styles.hidden]: !finalIsVisible,
      })}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
