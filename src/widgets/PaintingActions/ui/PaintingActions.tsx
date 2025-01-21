import { useAppDispatch } from '@/src/app/model/redux/hooks'
import { DefaultButton } from '@/src/shared/ui/buttons/DefaultButton/DefaultButton'
import { actionOpenModal } from '@/src/shared/ui/modals/Modal/model/modalVisibilitySlice'
import { useRouter } from 'next/navigation'
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

  const handleCartClick = () => {
    if (paintingId) {
      router.push('/cart')
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
          В КОРЗИНУ
        </DefaultButton>
      )}
    </div>
  )
}
