'use client'
/* eslint-disable */

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { API_BASE_URL } from '@/src/shared/config/apiConfig'
import { DefaultButton } from '@/src/shared/ui/buttons/DefaultButton/DefaultButton'
import { Spinner } from '@/src/shared/ui/Spinner/Spinner'
import cn from 'classnames'
import '../../temp/styles.css'
import styles from './ForgotPasswordPage.module.scss'

export const ForgotPasswordPage = () => {
  const [resetStatus, setResetStatus] = useState<string>('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [email, setEmail] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/forgot-password`,
        {
          email,
        }
      )

      if (response.data.message === 'Reset password email sent') {
        setIsSuccess(true)
        setResetStatus(
          'Инструкции по восстановлению пароля отправлены на вашу почту'
        )
      }
    } catch (error) {
      setIsError(true)
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message
        switch (errorMessage) {
          case 'User not found':
            setResetStatus('Пользователь с таким email не найден')
            break
          default:
            setResetStatus('Ошибка при отправке инструкций')
        }
      } else {
        setResetStatus('Произошла неизвестная ошибка')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToLogin = () => {
    router.push('/auth')
  }

  return (
    <div className='outerContainer'>
      <div className={styles.forgot_password_container}>
        <h2 className={styles.forgot_password_title}>Восстановление пароля</h2>

        {isLoading ? (
          <div className={styles.spinner_container}>
            <Spinner />
          </div>
        ) : (
          <>
            {!isSuccess ? (
              <form className={styles.form_container} onSubmit={handleSubmit}>
                <input
                  className={styles.form_input}
                  type='email'
                  placeholder='Введите ваш email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <DefaultButton
                  className={cn('action_button', {})}
                  type='submit'
                >
                  ОТПРАВИТЬ
                </DefaultButton>
              </form>
            ) : null}

            <p
              className={`
                ${styles.reset_status} 
                ${isSuccess ? styles.success : ''} 
                ${isError ? styles.error : ''}
              `}
            >
              {resetStatus}
            </p>

            <DefaultButton
              className={cn('action_button', {})}
              onClick={handleBackToLogin}
            >
              ВЕРНУТЬСЯ К ВХОДУ
            </DefaultButton>
          </>
        )}
      </div>
    </div>
  )
}
