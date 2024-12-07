/* eslint-disable */
import { ReactNode, DetailedHTMLProps, ButtonHTMLAttributes } from 'react'
import cn from 'classnames'
import styles from './Price.module.scss'
import { formatNumberWithSpaces } from '../../lib/common'

interface IPriceProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string
  onClick?: () => void
  href?: string
  size?: 'small' | 'medium' | 'large'
  priceType?: string
  discount?: number
  price?: number
}
export const Price = ({
  children,
  className,
  onClick,
  href,
  size = 'medium',
  priceType,
  discount,
  price,
  ...props
}: IPriceProps) => {
  return (
    <>
      {priceType === 'Специальное предложение' && (
        <>
          <span
            className={cn(styles.special_offer, styles.price, className, {
              [styles.small]: size === 'small',
              [styles.large]: size === 'large',
            })}
            {...props}
          >
            {formatNumberWithSpaces(price)} ₽
          </span>
          <span className={styles.prise_description}>
            СПЕЦИАЛЬНОЕ ПРЕДЛОЖЕНИЕ {discount}% ОТ ЦЕНЫ НА КАРТУ
          </span>
        </>
      )}
      {priceType === 'Возможна репродукция' && (
        <>
          <span
            className={cn(
              styles.reproduction_possible,
              styles.price,
              className,
              {
                [styles.small]: size === 'small',
                [styles.large]: size === 'large',
              }
            )}
            {...props}
          >
            {formatNumberWithSpaces(price)} ₽
          </span>
          <span className={cn(styles.prise_description, styles.price)}>
            ВОЗМОЖНА РЕПРОДУКЦИЯ
          </span>
        </>
      )}
      {priceType === 'Оригинал куплен' && (
        <>
          <span
            className={cn(styles.original_purchased, styles.price, className, {
              [styles.small]: size === 'small',
              [styles.large]: size === 'large',
            })}
            {...props}
          >
            {formatNumberWithSpaces(price)} ₽
          </span>
          <span className={styles.prise_description}>ОРИГИНАЛ КУПЛЕН</span>
        </>
      )}
      {priceType === 'Оригинал на выставке' && (
        <>
          <span
            className={cn(
              styles.original_on_exhibition,
              styles.price,
              className,
              {
                [styles.small]: size === 'small',
                [styles.large]: size === 'large',
              }
            )}
            {...props}
          >
            {formatNumberWithSpaces(price)} ₽
          </span>
          <span className={styles.prise_description}>ОРИГИНАЛ НА ВЫСТАВКЕ</span>
        </>
      )}
      {priceType === 'Оригинал забронирован' && (
        <>
          <span
            className={cn(styles.original_reserved, styles.price, className, {
              [styles.small]: size === 'small',
              [styles.large]: size === 'large',
            })}
            {...props}
          >
            {formatNumberWithSpaces(price)} ₽
          </span>
          <span className={styles.prise_description}>
            ОРИГИНАЛ ЗАБРОНИРОВАН
          </span>
        </>
      )}
      {priceType === 'Оригинал не продаётся' && (
        <>
          <span
            className={cn(
              styles.original_not_for_sale,
              styles.price,
              className,
              {
                [styles.small]: size === 'small',
                [styles.large]: size === 'large',
              }
            )}
            {...props}
          ></span>
          <span className={styles.prise_description}>
            ОРИГИНАЛ НЕ ПРОДАЁТСЯ
          </span>
        </>
      )}
      {price && discount && priceType === 'Скидка' && (
        <>
          <span
            className={cn(styles.descount_old, styles.price, className, {
              [styles.small]: size === 'small',
              [styles.large]: size === 'large',
            })}
            {...props}
          >
            {formatNumberWithSpaces(price)} ₽
          </span>
          <span
            className={cn(styles.price, {
              [styles.small]: size === 'small',
              [styles.large]: size === 'large',
            })}
          >
            {formatNumberWithSpaces(
              Math.round(price - price * (discount / 100))
            )}{' '}
            ₽
          </span>
          <span className={cn(styles.prise_description, styles.price)}>
            СКИДКА {discount}%
          </span>
        </>
      )}
      {!priceType && <span>Загрузка...</span>}
    </>
  )
}
