'use client'

import { useState } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '@/src/shared/config/apiConfig'
import { DefaultButton } from '@/src/shared/ui/buttons/DefaultButton/DefaultButton'
import { Spinner } from '@/src/shared/ui/Spinner/Spinner'
import { useRouter, useSearchParams } from 'next/navigation'
import cn from 'classnames'
import Link from 'next/link'
import '../../temp/styles.css'
import styles from './ResetPasswordPage.module.scss'
import { useLang } from '@/src/shared/hooks/useLang'

export const ResetPasswordPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams?.get('token') || ''
  const { lang, translations } = useLang()

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [resetStatus, setResetStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      setIsError(true)
      setResetStatus(translations[lang].password_recovery.passwords_match_error)
      return
    }

    setIsLoading(true)

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/reset-password`, {
        token,
        newPassword,
      })

      if (response.data.message === 'Password successfully changed') {
        setIsSuccess(true)
        setResetStatus(
          translations[lang].password_recovery.success_reset +
            ' ' +
            'Перенаправление на страницу входа...'
        )
        setTimeout(() => router.push('/auth'), 3000)
      }
    } catch (error) {
      setIsError(true)
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message
        /* eslint-disable indent */
        switch (errorMessage) {
          case 'Invalid or expired reset token':
            setResetStatus(translations[lang].password_recovery.invalid_token)
            break
          default:
            setResetStatus('Ошибка при сбросе пароля')
        }
        /* eslint-enable indent */
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='outerContainer'>
      <div className={styles.forgot_password_container}>
        <h2 className={styles.forgot_password_title}>
          {translations[lang].password_recovery.reset_title}
        </h2>

        {isLoading ? (
          <div className={styles.spinner_container}>
            <Spinner />
          </div>
        ) : (
          <>
            {!isSuccess ? (
              <form className={styles.form_container} onSubmit={handleSubmit}>
                <input
                  className={styles.signin_form_input}
                  type='password'
                  placeholder={
                    translations[lang].password_recovery.new_password
                  }
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <input
                  className={styles.signin_form_input}
                  type='password'
                  placeholder={
                    translations[lang].password_recovery.confirm_password
                  }
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <DefaultButton
                  className={cn('action_button', {})}
                  type='submit'
                  disabled={isLoading}
                >
                  {translations[lang].password_recovery.save_password}
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
