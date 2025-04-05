'use client'

import { useAppDispatch, useAppSelector } from '@/src/app/model/redux/hooks'
import { DefaultButton } from '@/src/shared/ui/buttons/DefaultButton/DefaultButton'
import { actionOpenModal } from '@/src/shared/ui/modals/Modal/model/modalVisibilitySlice'
import styles from './CartTotal.module.scss'
import { useLang } from '@/src/shared/hooks/useLang'

interface CartTotalProps {
  totalSum: number
}

export const CartTotal = ({ totalSum }: CartTotalProps) => {
  const dispatch = useAppDispatch()
  const cartIds = useAppSelector((state) => state.cart.cartIds)
  const { lang, translations } = useLang()

  const handleOrderClick = () => {
    dispatch(
      actionOpenModal({
        buttonLabel: translations[lang].cart_page.place_order,
        cartItemIds: cartIds,
      })
    )
  }

  return (
    <div className={styles.cart_total}>
      <div className={styles.cart_total_sum}>
        <span className={styles.cart_total_label}>
          {translations[lang].cart_page.total}
        </span>
        <span className={styles.cart_total_value}>{totalSum} ₽</span>
      </div>
      <DefaultButton onClick={handleOrderClick} className='action_button'>
        {translations[lang].cart_page.checkout}
      </DefaultButton>
    </div>
  )
}
