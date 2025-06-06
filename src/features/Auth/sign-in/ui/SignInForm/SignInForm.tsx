'use client'
import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import axios, { AxiosError } from 'axios'
import { API_BASE_URL } from '@/src/shared/config/apiConfig'
import { DefaultButton } from '@/src/shared/ui/buttons/DefaultButton/DefaultButton'
import { useAppSelector, useAppDispatch } from '@/src/app/model/redux/hooks'
import { login, setFormType } from '../../model/auth/authSlice'
import { useRouter } from 'next/navigation'
import { SuccessMessage } from '../SuccessMessage/SuccessMessage'
import { Spinner } from '@/src/shared/ui/Spinner/Spinner'
import { useLang } from '@/src/shared/hooks/useLang'
import cn from 'classnames'
import styles from './SignInForm.module.scss'

type ApiFormData = {
  userName?: string
  userPassword: string
  email: string
}

interface ServerError {
  message: string
  statusCode?: number
}

const submitForm = async (
  formData: ApiFormData,
  formType: 'login' | 'register'
) => {
  const endpoint = formType === 'login' ? '/auth/login' : '/auth/registration'
  const response = await axios.post(`${API_BASE_URL}${endpoint}`, formData)
  return response.data
}

export const SignInForm = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const formType = useAppSelector((state) => state.auth.formType)
  const { lang, translations } = useLang()

  const currentAuthTitle =
    formType === 'login'
      ? translations[lang].auth.login
      : translations[lang].auth.register
  const inputRef = useRef<HTMLInputElement>(null)
  const [isChecked, setIsChecked] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const mutation = useMutation(
    (data: { formData: ApiFormData; formType: 'login' | 'register' }) =>
      submitForm(data.formData, data.formType),
    {
      onSuccess: (response) => {
        console.log('Форма успешно отправлена')
        if (formType === 'register') {
          setShowSuccessMessage(true)
        } else {
          localStorage.setItem('auth', JSON.stringify(response))
          dispatch(login({ userName: response.userName }))
          router.push('/')
        }
        setIsSubmitting(false)
      },
      onError: (error: AxiosError<ServerError>) => {
        console.log('Произошла ошибка при отправке формы')
        const errorMessage =
          error.response?.data?.message || 'Неизвестная ошибка'
        console.error('Ошибка:', errorMessage)
        setIsSubmitting(false)
      },
    }
  )

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!isChecked) {
      alert('Пожалуйста, согласитесь с политикой персональных данных')
      return
    }

    setIsSubmitting(true)

    const formData = {
      userName: name,
      userPassword: password,
      email,
    }
    mutation.mutate({ formData, formType })
  }

  const handleFormTypeChange = (type: 'login' | 'register') => {
    dispatch(setFormType(type))
    setName('')
    setEmail('')
    setPassword('')
    mutation.reset()
  }

  return (
    <>
      {showSuccessMessage && formType === 'register' ? (
        <SuccessMessage />
      ) : (
        <form className={styles.signin_form_container} onSubmit={handleSubmit}>
          <span className={styles.signin_form_title}>{currentAuthTitle}</span>
          {formType === 'register' && (
            <input
              className={styles.signin_form_input}
              type='text'
              placeholder={translations[lang].auth.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete='username'
            />
          )}
          <input
            className={styles.signin_form_input}
            type='email'
            placeholder={translations[lang].auth.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete='email'
          />
          <input
            className={styles.signin_form_input}
            type='password'
            placeholder={translations[lang].auth.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete='current-password'
          />
          <Link
            href='/forgot-password'
            className={cn(styles.form_link, styles.forgot_password_link)}
          >
            {translations[lang].auth.forgot_password}
          </Link>
          <div className={styles.form_checkbox_container}>
            <input
              className={styles.form_checkbox}
              type='checkbox'
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              required
            />
            <span>{translations[lang].auth.privacy_agreement}</span>
          </div>
          <DefaultButton
            className={cn('action_button', {})}
            type='submit'
            disabled={mutation.isLoading || isSubmitting}
          >
            {mutation.isLoading ? (
              <Spinner />
            ) : formType === 'login' ? (
              translations[lang].auth.login_button
            ) : (
              translations[lang].auth.register_button
            )}
          </DefaultButton>
          {mutation.isError && (
            <p className={styles.error_message}>
              {(mutation.error as AxiosError<ServerError>).response?.data
                ?.message || 'Произошла ошибка при отправке формы'}
            </p>
          )}
          <div className={styles.question_text_container}>
            {formType === 'login' ? (
              <>
                <span className={styles.question_text}>
                  {translations[lang].auth.no_account}
                </span>
                <Link
                  href='#'
                  className={styles.form_link}
                  onClick={() => handleFormTypeChange('register')}
                >
                  {translations[lang].auth.register_link}
                </Link>
              </>
            ) : (
              <>
                <span className={styles.question_text}>
                  {translations[lang].auth.have_account}
                </span>
                <Link
                  href='#'
                  className={styles.form_link}
                  onClick={() => handleFormTypeChange('login')}
                >
                  {translations[lang].auth.login_link}
                </Link>
              </>
            )}
          </div>
        </form>
      )}
    </>
  )
}
