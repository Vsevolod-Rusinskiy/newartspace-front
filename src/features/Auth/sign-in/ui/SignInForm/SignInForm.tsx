'use client'
import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
// import { useAppSelector } from '@/src/app/model/redux/hooks'
// import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useMutation } from 'react-query'
import axios from 'axios'
import { API_BASE_URL } from '@/src/shared/config/apiConfig'
import { DefaultButton } from '@/src/shared/ui/buttons/DefaultButton/DefaultButton'
import cn from 'classnames'
import styles from './SignInForm.module.scss'
import { login } from '@/src/app/model/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/src/app/model/redux/store'

type ApiFormData = {
  userName?: string
  userPassword: string
  email: string
}

const submitForm = async (formData: ApiFormData) => {
  console.log('formData', formData)
  const response = await axios.post(
    `${API_BASE_URL}/auth/registration`,
    formData
  )
  console.log('response', response)
  return response.data
}

export const SignInForm = () => {
  // const [formType, setFormType] = useState<'login' | 'register'>('login')
  const formType = useSelector((state: RootState) =>
    state.auth.isLoggedIn ? 'login' : 'register'
  )
  const currentAuthTitle = formType === 'login' ? 'Войти' : 'Регистрация'
  const inputRef = useRef<HTMLInputElement>(null)
  const [isChecked, setIsChecked] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const dispatch = useDispatch()

  const mutation = useMutation(submitForm, {
    onSuccess: (response) => {
      setSuccessMessage('Регистрация прошла успешно')
      console.log('response', response)
      dispatch(login(response.name))
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error ? error.message : 'Неизвестная ошибка'
      console.error('Ошибка: ' + errorMessage)
    },
  })

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
    mutation.mutate(formData)

    setName('')
    setEmail('')
    setPassword('')
    setIsChecked(false)
  }

  return (
    <form className={styles.signin_form_container} onSubmit={handleSubmit}>
      <span className={styles.signin_form_title}>
        {successMessage || currentAuthTitle}
      </span>
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
        {mutation.isLoading
          ? 'Отправка данных...'
          : currentAuthTitle.toUpperCase()}
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
              onClick={() => setFormType('register')}
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
              onClick={() => setFormType('login')}
            >
              Войти
            </Link>
          </>
        )}
      </div>
    </form>
  )
}
