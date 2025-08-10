'use client'

import { useAppDispatch } from '@/src/app/model/redux/hooks'
import { confirmAge } from '../../model/ageVerificationSlice'
import styles from './AgeVerificationModal.module.scss'

interface AgeVerificationModalProps {
  isOpen: boolean
  onClose: () => void
}

export const AgeVerificationModal = ({
  isOpen,
  onClose,
}: AgeVerificationModalProps) => {
  const dispatch = useAppDispatch()

  const handleConfirmAge = () => {
    dispatch(confirmAge())
    onClose()
  }

  const handleRejectAge = () => {
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className={styles.modal_overlay} onClick={onClose}>
      <div
        className={styles.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modal_header}>
          <h2 className={styles.title}>Подтверждение возраста</h2>
        </div>

        <div className={styles.modal_body}>
          <p className={styles.message}>
            Это контент для взрослых. Вам есть 18 лет?
          </p>
        </div>

        <div className={styles.modal_footer}>
          <button className={styles.confirm_button} onClick={handleConfirmAge}>
            Да
          </button>
          <button className={styles.reject_button} onClick={handleRejectAge}>
            Нет
          </button>
        </div>
      </div>
    </div>
  )
}
