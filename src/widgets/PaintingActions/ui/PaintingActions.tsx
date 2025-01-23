import { useAppDispatch } from '@/src/app/model/redux/hooks'
import { DefaultButton } from '@/src/shared/ui/buttons/DefaultButton/DefaultButton'
import { toggleCart } from '@/src/entities/Cart/model/cartSlice'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/src/app/model/redux/store'
import cn from 'classnames'
import styles from './PaintingActions.module.scss'

interface PaintingActionsProps {
  className?: string
  paintingId?: number
  priceType?: string
}

export const PaintingActions = ({
  className,
  paintingId,
  priceType,
}: PaintingActionsProps) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { cartIds } = useSelector((state: RootState) => state.cart)
  const isInCart = paintingId ? cartIds.includes(paintingId) : false

  const handleCartClick = async () => {
    if (paintingId) {
      if (isInCart) {
        router.push('/cart')
      } else {
        await dispatch(toggleCart(paintingId))
      }
    }
  }

  return (
    <div className={cn(styles.actions, className)}>
      {/* <DefaultButton
        className={cn('action_button', styles.action_button)}
        onClick={() => dispatch(actionOpenModal('ЗАКАЗАТЬ В ОДИН КЛИК'))}
        priceType={priceType}
      >
        ЗАКАЗАТЬ В ОДИН КЛИК
      </DefaultButton> */}
      {/* {isReproducible && (
        <DefaultButton
          className={cn('action_button', styles.action_button)}
          onClick={() => dispatch(actionOpenModal('ЗАКАЗАТЬ РЕПРОДУКЦИЮ'))}
        >
          ЗАКАЗАТЬ РЕПРОДУКЦИЮ
          </DefaultButton>
        )} */}
      {paintingId &&
        /* eslint-disable indent */
        priceType !== 'Возможна репродукция' &&
        priceType !== 'Оригинал куплен' &&
        priceType !== 'Оригинал не продаётся' &&
        priceType !== 'Оригинал забронирован' && (
          <DefaultButton
            className={cn('action_button', styles.action_button)}
            onClick={handleCartClick}
          >
            {isInCart ? 'ПЕРЕЙТИ В КОРЗИНУ' : 'ПОЛОЖИТЬ В КОРЗИНУ'}
          </DefaultButton>
        )}
    </div>
  )
  /* eslint-enable indent */
}
