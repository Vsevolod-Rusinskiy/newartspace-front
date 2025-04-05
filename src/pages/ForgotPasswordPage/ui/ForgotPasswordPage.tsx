'use client'

import { useState } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '@/src/shared/config/apiConfig'
import { DefaultButton } from '@/src/shared/ui/buttons/DefaultButton/DefaultButton'
import { Spinner } from '@/src/shared/ui/Spinner/Spinner'
import cn from 'classnames'
import Link from 'next/link'
import '../../temp/styles.css'
import styles from './ForgotPasswordPage.module.scss'
import { useLang } from '@/src/shared/hooks/useLang'

export const ForgotPasswordPage = () => {
  const [resetStatus, setResetStatus] = useState<string>('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [email, setEmail] = useState('')
  const { lang, translations } = useLang()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      /* eslint-disable indent */
      const response = await axios.post(
        `${API_BASE_URL}/auth/forgot-password`,
        {
          email,
        }
      )
      /* eslint-enable indent */

      if (
        response.data.message ===
        'Password reset instructions sent to your email'
      ) {
        setIsSuccess(true)
        setResetStatus(translations[lang].password_recovery.success_message)
      }
    } catch (error) {
      setIsError(true)
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message
        /* eslint-disable indent */
        switch (errorMessage) {
          case 'User with this email not found':
            setResetStatus('Пользователь с таким email не найден')
            break
          case 'Invalid or expired reset token':
            setResetStatus(translations[lang].password_recovery.invalid_token)
            break
          default:
            setResetStatus('Ошибка при отправке инструкций')
        }
      } else {
        setResetStatus(translations[lang].email_verification.unknown_error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='outerContainer'>
      <div className={styles.forgot_password_container}>
        <h2 className={styles.forgot_password_title}>
          {translations[lang].password_recovery.title}
        </h2>

        {isLoading ? (
          <div className={styles.spinner_container}>
            <Spinner />
          </div>
        ) : (
          <>
            {!isSuccess ? (
              <form className={styles.form_container} onSubmit={handleSubmit}>
                <p className={styles.reset_instructions}>
                  {translations[lang].password_recovery.reset_instructions}
                </p>
                <input
                  className={styles.signin_form_input}
                  type='email'
                  placeholder={translations[lang].password_recovery.email_label}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete='email'
                />
                <DefaultButton
                  className={cn('action_button', {})}
                  type='submit'
                  disabled={isLoading}
                >
                  {translations[lang].password_recovery.submit_button}
                </DefaultButton>
                <Link href='/auth' className={styles.form_link}>
                  {translations[lang].password_recovery.back_to_login}
                </Link>
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
          </>
        )}
      </div>
    </div>
  )
}
