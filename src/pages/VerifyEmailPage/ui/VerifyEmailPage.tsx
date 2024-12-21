'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import { API_BASE_URL } from '@/src/shared/config/apiConfig'
import '../../temp/styles.css'
import styles from './VerifyEmailPage.module.scss'

export const VerifyEmailPage = () => {
  const [verificationStatus, setVerificationStatus] = useState<string>('')
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  useEffect(() => {
    const verifyEmail = async () => {
      console.log('Verification token:', token)

      if (!token) {
        setVerificationStatus('Токен верификации отсутствует')
        return
      }

      try {
        const response = await axios.get(
          `${API_BASE_URL}/auth/verify-email?token=${token}`
        )
        console.log('Verification response:', response.data)
      } catch (error) {
        console.error('Verification error:', error)
      }
    }

    verifyEmail()
  }, [token])

  return (
    <div className='outerContainer'>
      <div className={styles.verify_email_container}>
        <h2 className={styles.verify_email_title}>Верификация Email</h2>
        <p className={styles.verify_email_status}>{verificationStatus}</p>
      </div>
    </div>
  )
}
