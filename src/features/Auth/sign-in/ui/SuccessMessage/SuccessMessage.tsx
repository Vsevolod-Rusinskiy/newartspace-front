'use client'

import styles from './SuccessMessage.module.scss'

export const SuccessMessage = () => {
  return (
    <div className={styles.success_message_container}>
      <h2 className={styles.success_title}>Регистрация прошла успешно!</h2>
      <p className={styles.success_text}>
        Проверьте вашу почту для подтверждения регистрации
      </p>
      <p className={styles.spam_notice}>
        * Письмо может находиться в папке &quot;Спам&quot;
      </p>
    </div>
  )
}
