'use client'

import { useAppDispatch } from '@/src/app/model/redux/hooks'
import { DefaultButton } from '@/src/shared/ui/buttons/DefaultButton/DefaultButton'
import { actionOpenModal } from '@/src/shared/ui/modals/Modal/model/modalVisibilitySlice'
import styles from './CartTotal.module.scss'

interface CartTotalProps {
  totalSum: number
}

export const CartTotal = ({ totalSum }: CartTotalProps) => {
  const dispatch = useAppDispatch()

  const handleOrderClick = () => {
    dispatch(
      actionOpenModal({
        buttonLabel: 'ОФОРМИТЬ ЗАКАЗ',
      })
    )
  }

  return (
    <div className={styles.cart_total}>
      <div className={styles.cart_total_sum}>
        <span className={styles.cart_total_label}>Итого:</span>
        <span className={styles.cart_total_value}>{totalSum} ₽</span>
      </div>
      <DefaultButton onClick={handleOrderClick} className='action_button'>
        ОФОРМИТЬ ЗАКАЗ
      </DefaultButton>
    </div>
  )
}
