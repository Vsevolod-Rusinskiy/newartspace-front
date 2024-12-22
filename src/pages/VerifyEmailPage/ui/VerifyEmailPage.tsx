'use client'
/* eslint-disable */
import { useEffect, useState, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { API_BASE_URL } from '@/src/shared/config/apiConfig'
import { DefaultButton } from '@/src/shared/ui/buttons/DefaultButton/DefaultButton'
import { Spinner } from '@/src/shared/ui/Spinner/Spinner'
import { useAppDispatch } from '@/src/app/model/redux/hooks'
import { setFormType } from '@/src/features/Auth/sign-in/model/auth/authSlice'
import cn from 'classnames'
import '../../temp/styles.css'
import styles from './VerifyEmailPage.module.scss'

export const VerifyEmailPage = () => {
  const [verificationStatus, setVerificationStatus] = useState<string>('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const verificationAttempted = useRef(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams?.get('token')
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!token) {
      setIsError(true)
      setVerificationStatus('Ссылка для подтверждения email недействительна')
      return
    }

    const verifyEmail = async () => {
      if (verificationAttempted.current) return
      verificationAttempted.current = true

      setIsLoading(true)

      try {
        const response = await axios.get(
          `${API_BASE_URL}/auth/verify-email?token=${token}`
        )

        if (response.data.message === 'Email verified successfully') {
          setIsSuccess(true)
          setVerificationStatus('Email успешно подтвержден!')
        }
      } catch (error) {
        setIsError(true)
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.message
          switch (errorMessage) {
            case 'Invalid verification token':
              setVerificationStatus(
                'Ссылка для подтверждения email недействительна'
              )
              break
            default:
              setVerificationStatus('Ошибка проверки email')
          }
        } else {
          setVerificationStatus('Произошла неизвестная ошибка')
        }
      } finally {
        setIsLoading(false)
      }
    }

    verifyEmail()
  }, [token, router])

  const handleRedirect = (formType: 'register' | 'login') => {
    setIsNavigating(true)
    setTimeout(() => {
      dispatch(setFormType(formType))
      router.push('/auth')
    }, 500)
  }

  return (
    <div className='outerContainer'>
      <div className={styles.verify_email_container}>
        <h2 className={styles.verify_email_title}>Подтверждение email</h2>

        {isLoading || isNavigating ? (
          <div className={styles.spinner_container}>
            <Spinner />
          </div>
        ) : (
          <>
            <p
              className={`
                ${styles.verify_email_status} 
                ${isSuccess ? styles.success : ''} 
                ${isError ? styles.error : ''}
              `}
            >
              {verificationStatus}
            </p>

            {isError && (
              <DefaultButton
                className={cn('action_button', {})}
                onClick={() => handleRedirect('register')}
              >
                ПЕРЕЙТИ К РЕГИСТРАЦИИ
              </DefaultButton>
            )}

            {isSuccess && (
              <DefaultButton
                className={cn('action_button', {})}
                onClick={() => handleRedirect('login')}
              >
                ВОЙТИ
              </DefaultButton>
            )}
          </>
        )}
      </div>
    </div>
  )
}
