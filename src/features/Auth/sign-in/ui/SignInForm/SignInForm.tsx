'use client'
import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import axios from 'axios'
import { API_BASE_URL } from '@/src/shared/config/apiConfig'
import { DefaultButton } from '@/src/shared/ui/buttons/DefaultButton/DefaultButton'
import cn from 'classnames'
import styles from './SignInForm.module.scss'
import { useAppSelector, useAppDispatch } from '@/src/app/model/redux/hooks'
import { login, setFormType } from '../../model/auth/authSlice'
import { useRouter } from 'next/navigation'
import { SuccessMessage } from '../SuccessMessage/SuccessMessage'
import { Spinner } from '@/src/shared/ui/Spinner/Spinner'

type ApiFormData = {
  userName?: string
  userPassword: string
  email: string
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
  const currentAuthTitle = formType === 'login' ? 'Войти' : 'Регистрация'
  const inputRef = useRef<HTMLInputElement>(null)
  const [isChecked, setIsChecked] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const mutation = useMutation(
    (data: { formData: ApiFormData; formType: 'login' | 'register' }) =>
      submitForm(data.formData, data.formType),
    {
      onSuccess: (response) => {
        if (formType === 'register') {
          setShowSuccessMessage(true)
        } else {
          localStorage.setItem('auth', JSON.stringify(response))
          dispatch(login({ userName: response.userName }))
          router.push('/')
        }
      },
      onError: (error: unknown) => {
        const errorMessage =
          error instanceof Error ? error.message : 'Неизвестная ошибка'
        console.error('Ошибка: ' + errorMessage)
      },
    }
  )

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isChecked) {
      alert('Пожалуйста, согласитесь с политикой конфиденциальности')
      return
    }

    const formData = {
      userName: name,
      userPassword: password,
      email,
    }
    mutation.mutate({ formData, formType })

    setName('')
    setEmail('')
    setPassword('')
    setIsChecked(false)
  }

  const handleFormTypeChange = (type: 'login' | 'register') => {
    dispatch(setFormType(type))
    setName('')
    setEmail('')
    setPassword('')
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
              placeholder='Имя*'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete='username'
            />
          )}
          <input
            className={styles.signin_form_input}
            type='email'
            placeholder='Почта*'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete='email'
          />
          <input
            className={styles.signin_form_input}
            type='password'
            placeholder='Пароль*'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete='current-password'
          />

          <div className={styles.form_checkbox_container}>
            <input
              className={styles.form_checkbox}
              type='checkbox'
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              required
            />
            <span>
              Я согласен{' '}
              <Link href='#' className={styles.form_link}>
                с политикой конфиденциальности
              </Link>
            </span>
          </div>
          <DefaultButton
            className={cn('action_button', {})}
            type='submit'
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? <Spinner /> : currentAuthTitle.toUpperCase()}
          </DefaultButton>
          {mutation.isError && (
            <p className={styles.error_message}>
              Ошибка: {(mutation.error as Error).message}
            </p>
          )}
          <div className={styles.question_text_container}>
            {formType === 'login' ? (
              <>
                <span className={styles.question_text}>Еще нет аккаунта?</span>
                <Link
                  href='#'
                  className={styles.form_link}
                  onClick={() => handleFormTypeChange('register')}
                >
                  Зарегистрироваться
                </Link>
              </>
            ) : (
              <>
                <span className={styles.question_text}>Уже есть аккаунт?</span>
                <Link
                  href='#'
                  className={styles.form_link}
                  onClick={() => handleFormTypeChange('login')}
                >
                  Войти
                </Link>
              </>
            )}
          </div>
        </form>
      )}
    </>
  )
}
