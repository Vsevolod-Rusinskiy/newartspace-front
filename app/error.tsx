'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { NoData } from '@/src/shared/ui/NoData/NoData'
import styles from './error-handlers/error.module.scss'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Опционально: логируем ошибку на сервер
    console.error('Произошла ошибка:', error)
  }, [error])

  return (
    <div className={styles.error_container}>
      <NoData />
      <h2 className={styles.error_title}>Что-то пошло не так</h2>
      <p className={styles.error_message}>
        Извините, на сервере произошла ошибка. Мы уже работаем над её
        устранением.
      </p>
      <div className={styles.buttons_container}>
        <button onClick={reset} className={styles.primary_button}>
          Попробовать снова
        </button>
        <Link href='/' className={styles.secondary_button}>
          На главную
        </Link>
      </div>
    </div>
  )
}
