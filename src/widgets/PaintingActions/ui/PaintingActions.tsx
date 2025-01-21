import { useAppDispatch } from '@/src/app/model/redux/hooks'
import { DefaultButton } from '@/src/shared/ui/buttons/DefaultButton/DefaultButton'
import { actionOpenModal } from '@/src/shared/ui/modals/Modal/model/modalVisibilitySlice'
import { toggleCart } from '@/src/entities/Cart/model/cartSlice'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/src/app/model/redux/store'
import cn from 'classnames'
import styles from './PaintingActions.module.scss'

interface PaintingActionsProps {
  isReproducible?: boolean
  priceType?: string
  className?: string
  paintingId?: number
}

export const PaintingActions = ({
  isReproducible,
  priceType,
  className,
  paintingId,
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
        setTimeout(() => {
          router.push('/cart')
        }, 0)
      }
    }
  }

  return (
    <div className={cn(styles.actions, className)}>
      <DefaultButton
        className={cn('action_button', {})}
        onClick={() => dispatch(actionOpenModal('ЗАКАЗАТЬ В ОДИН КЛИК'))}
        priceType={priceType}
      >
        ЗАКАЗАТЬ В ОДИН КЛИК
      </DefaultButton>
      {isReproducible && (
        <DefaultButton
          className={cn('action_button', {})}
          onClick={() => dispatch(actionOpenModal('ЗАКАЗАТЬ РЕПРОДУКЦИЮ'))}
        >
          ЗАКАЗАТЬ РЕПРОДУКЦИЮ
        </DefaultButton>
      )}
      {paintingId && (
        <DefaultButton
          className={cn('action_button', {})}
          onClick={handleCartClick}
        >
          {isInCart ? 'ПЕРЕЙТИ В КОРЗИНУ' : 'ПОЛОЖИТЬ В КОРЗИНУ'}
        </DefaultButton>
      )}
    </div>
  )
}
