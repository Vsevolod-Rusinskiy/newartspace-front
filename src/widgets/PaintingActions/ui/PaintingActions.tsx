import { useAppDispatch } from '@/src/app/model/redux/hooks'
import { DefaultButton } from '@/src/shared/ui/buttons/DefaultButton/DefaultButton'
import { actionOpenModal } from '@/src/shared/ui/modals/Modal/model/modalVisibilitySlice'
import cn from 'classnames'
import styles from './PaintingActions.module.scss'

interface PaintingActionsProps {
  isReproducible?: boolean
  priceType?: string
  className?: string
}

export const PaintingActions = ({
  isReproducible,
  priceType,
  className,
}: PaintingActionsProps) => {
  const dispatch = useAppDispatch()

  return (
    <div className={cn(styles.actions, className)}>
      <DefaultButton
        className={cn('action_button', {})}
        onClick={() => dispatch(actionOpenModal('КУПИТЬ В ОДИН КЛИК'))}
        priceType={priceType}
      >
        КУПИТЬ В ОДИН КЛИК
      </DefaultButton>
      {isReproducible && (
        <DefaultButton
          className={cn('action_button', {})}
          onClick={() => dispatch(actionOpenModal('ЗАКАЗАТЬ РЕПРОДУКЦИЮ'))}
        >
          ЗАКАЗАТЬ РЕПРОДУКЦИЮ
        </DefaultButton>
      )}
    </div>
  )
}
