/* eslint-disable */
import { ReactNode, DetailedHTMLProps, ButtonHTMLAttributes } from 'react'
// import { useSelector } from 'react-redux'
// import { RootState } from '@/src/app/model/redux/store'
import cn from 'classnames'
import styles from './Price.module.scss'
import { formatNumberWithSpaces } from '../../lib/common'
import { IPainting } from '@/src/pages/PaintingCardPage/types/PaintingCardPage.type'

interface IPriceProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string
  onClick?: () => void
  href?: string
  size?: 'small' | 'medium' | 'large'
  painting?: IPainting
}
export const Price = ({
  children,
  className,
  onClick,
  href,
  size = 'medium',
  painting,
  ...props
}: IPriceProps) => {
  switch (painting?.priceType) {
    case 'Специальное предложение':
      return (
        <>
          <span
            className={cn(styles.special_offer, styles.price, className, {
              [styles.small]: size === 'small',
              [styles.large]: size === 'large',
            })}
            {...props}
          >
            {formatNumberWithSpaces(painting?.price)} ₽
          </span>
          <span className={styles.prise_description}>
            Спецпредложение +{painting.discount}% на карту
          </span>
        </>
      )
    case 'Возможна репродукция':
      return (
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
            {formatNumberWithSpaces(painting?.price)} ₽
          </span>
          <span className={styles.prise_description}>Возможна репродукция</span>
        </>
      )
    case 'Оригинал куплен':
      return (
        <>
          <span
            className={cn(styles.original_purchased, styles.price, className, {
              [styles.small]: size === 'small',
              [styles.large]: size === 'large',
            })}
            {...props}
          >
            {formatNumberWithSpaces(painting?.price)} ₽
          </span>
          <span className={styles.prise_description}>Оригинал куплен</span>
        </>
      )
    case 'Оригинал на выставке':
      return (
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
            {formatNumberWithSpaces(painting?.price)} ₽
          </span>
          <span className={styles.prise_description}>Оригинал на выставке</span>
        </>
      )
    case 'Оригинал забронирован':
      return (
        <>
          <span
            className={cn(styles.original_reserved, styles.price, className, {
              [styles.small]: size === 'small',
              [styles.large]: size === 'large',
            })}
            {...props}
          >
            {formatNumberWithSpaces(painting?.price)} ₽
          </span>
          <span className={styles.prise_description}>
            Оригинал забронирован
          </span>
        </>
      )
    case 'Оригинал не продаётся':
      return (
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
            Оригинал не продаётся
          </span>
        </>
      )
    default:
      return (
        <span
          className={cn(styles.price, className, {
            [styles.small]: size === 'small',
            [styles.large]: size === 'large',
          })}
          {...props}
        >
          {formatNumberWithSpaces(painting?.price)} ₽
        </span>
      )
  }
}
