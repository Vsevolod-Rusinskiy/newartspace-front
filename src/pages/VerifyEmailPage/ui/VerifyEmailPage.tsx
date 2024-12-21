'use client'
/* eslint-disable */
import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { API_BASE_URL } from '@/src/shared/config/apiConfig'
import { DefaultButton } from '@/src/shared/ui/buttons/DefaultButton/DefaultButton'
import { Spinner } from '@/src/shared/ui/Spinner/Spinner'
import '../../temp/styles.css'
import styles from './VerifyEmailPage.module.scss'

export const VerifyEmailPage = () => {
  const [verificationStatus, setVerificationStatus] = useState<string>('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  useEffect(() => {
    if (!token) {
      setIsError(true)
      setVerificationStatus('Ссылка для подтверждения email недействительна')
      return
    }

    const verifyEmail = async () => {
      setIsLoading(true)

      try {
        const response = await axios.get(
          `${API_BASE_URL}/auth/verify-email?token=${token}`
        )

        if (response.data.message === 'Email verified successfully') {
          setIsSuccess(true)
          setVerificationStatus('Email успешно подтвержден!')
          setTimeout(() => {
            router.push('/auth')
          }, 3000)
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
              setVerificationStatus('Ошибка верификации email')
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

  const handleAuthRedirect = () => {
    router.push('/auth')
  }

  return (
    <div className='outerContainer'>
      <div className={styles.verify_email_container}>
        <h2 className={styles.verify_email_title}>Верификация Email</h2>

        {isLoading ? (
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
                className={styles.auth_button}
                onClick={handleAuthRedirect}
              >
                Перейти к авторизации
              </DefaultButton>
            )}
          </>
        )}
      </div>
    </div>
  )
}
