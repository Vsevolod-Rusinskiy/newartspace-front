import { Modal } from '@/src/shared/ui/modals/Modal/Modal'
import { RequestForm } from '../RequestForm/RequestForm'
import { useAppSelector } from '@/src/app/model/redux/hooks'
import { FormType } from '../RequestForm/RequestForm'

export const RequestFormModal = () => {
  const buttonLabel = useAppSelector(
    (state) => state.modalVisibility.buttonLabel
  )
  const paintingId = useAppSelector((state) => state.modalVisibility.paintingId)
  const cartItemIds = useAppSelector(
    (state) => state.modalVisibility.cartItemIds
  )

  const getFormType = (label: string): FormType => {
    if (!label) return 'cart'

    /* eslint-disable */
    switch (label) {
      case 'ЗАКАЗАТЬ РЕПРОДУКЦИЮ':
        return 'reproduction'
      case 'ОФОРМИТЬ ЗАКАЗ':
        return 'cart'
      default:
        console.log('Тип формы по умолчанию:', label)
        return 'cart'
    }
    /* eslint-enable */
  }

  console.log('Модальное окно:', { buttonLabel, paintingId, cartItemIds })
  const formType = getFormType(buttonLabel)

  return (
    <Modal>
      <RequestForm
        formType={formType}
        paintingId={paintingId}
        cartItemIds={cartItemIds}
      />
    </Modal>
  )
}
