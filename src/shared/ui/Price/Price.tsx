/* eslint-disable */
import { ReactNode, DetailedHTMLProps, ButtonHTMLAttributes } from 'react'
import cn from 'classnames'
import styles from './Price.module.scss'
import { formatNumberWithSpaces } from '../../lib/common'
import { useLang } from '@/src/shared/hooks/useLang'

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
  hidePrice?: boolean
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
  hidePrice = true,
  ...props
}: IPriceProps) => {
  const effective_discount = discount !== undefined ? discount : null
  const { lang, translations } = useLang()

  return (
    <div className={cn(styles.price_wrapper, className)}>
      {hidePrice && (
        <span
          className={cn(styles.price_title, {
            [styles.small]: size === 'small',
            [styles.large]: size === 'large',
            [styles.medium]: size === 'medium',
          })}
        >
          {translations[lang].price_descriptions.price}
        </span>
      )}
      {priceType === 'Специальное предложение' && (
        <>
          <span
            className={cn(styles.special_offer, styles.price, className, {
              [styles.small]: size === 'small',
              [styles.large]: size === 'large',
              [styles.medium]: size === 'medium',
            })}
            {...props}
          >
            {formatNumberWithSpaces(price)} ₽
          </span>
          <span className={styles.prise_description}>
            {translations[lang].price_descriptions.special_offer.replace(
              '{discount}',
              discount?.toString() || ''
            )}
          </span>
        </>
      )}
      {price &&
        effective_discount !== null &&
        effective_discount > 0 &&
        priceType === 'Скидка' && (
          <>
            <span
              className={cn(styles.descount_old, styles.price, className, {
                [styles.small]: size === 'small',
                [styles.large]: size === 'large',
                [styles.medium]: size === 'medium',
              })}
              {...props}
            >
              {formatNumberWithSpaces(price)} ₽
            </span>
            <span
              className={cn(styles.price, {
                [styles.small]: size === 'small',
                [styles.large]: size === 'large',
                [styles.medium]: size === 'medium',
              })}
            >
              {formatNumberWithSpaces(
                Math.round(price - price * (effective_discount / 100))
              )}{' '}
              ₽
            </span>
            <span className={cn(styles.prise_description, styles.price)}>
              {translations[lang].price_descriptions.discount.replace(
                '{discount}',
                effective_discount?.toString() || ''
              )}
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
                [styles.medium]: size === 'medium',
              }
            )}
            {...props}
          >
            {formatNumberWithSpaces(price)} ₽
          </span>
          <span className={cn(styles.prise_description, styles.price)}>
            {translations[lang].price_descriptions.reproduction_possible}
          </span>
        </>
      )}
      {priceType === 'Оригинал куплен' && (
        <>
          <span
            className={cn(styles.original_purchased, styles.price, className, {
              [styles.small]: size === 'small',
              [styles.large]: size === 'large',
              [styles.medium]: size === 'medium',
            })}
            {...props}
          >
            {formatNumberWithSpaces(price)} ₽
          </span>
          <span className={styles.prise_description}>
            {translations[lang].price_descriptions.original_purchased}
          </span>
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
                [styles.medium]: size === 'medium',
              }
            )}
            {...props}
          >
            {formatNumberWithSpaces(price)} ₽
          </span>
          <span className={styles.prise_description}>
            {translations[lang].price_descriptions.original_on_exhibition}
          </span>
        </>
      )}
      {priceType === 'Оригинал забронирован' && (
        <>
          <span
            className={cn(styles.original_reserved, styles.price, className, {
              [styles.small]: size === 'small',
              [styles.large]: size === 'large',
              [styles.medium]: size === 'medium',
            })}
            {...props}
          >
            {formatNumberWithSpaces(price)} ₽
          </span>
          <span className={styles.prise_description}>
            {translations[lang].price_descriptions.original_reserved}
          </span>
        </>
      )}
      {priceType === 'Оригинал не продаётся' && price !== 0 && (
        <>
          <span
            className={cn(
              styles.original_not_for_sale,
              styles.price,
              className,
              {
                [styles.small]: size === 'small',
                [styles.large]: size === 'large',
                [styles.medium]: size === 'medium',
              }
            )}
            {...props}
          ></span>
          <span className={styles.prise_description}>
            {translations[lang].price_descriptions.original_not_for_sale}
          </span>
        </>
      )}
      {!priceType && (
        <span
          className={cn(styles.price, {
            [styles.small]: size === 'small',
            [styles.large]: size === 'large',
            [styles.medium]: size === 'medium',
          })}
        >
          {formatNumberWithSpaces(price)} ₽
        </span>
      )}
    </div>
  )
}
