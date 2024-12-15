'use client'
import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import { useAppSelector } from '@/src/app/model/redux/hooks'
// import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useMutation } from 'react-query'
import axios from 'axios'
import { API_BASE_URL } from '@/src/shared/config/apiConfig'
import { DefaultButton } from '@/src/shared/ui/buttons/DefaultButton/DefaultButton'
import cn from 'classnames'
import styles from './SignInForm.module.scss'

type FormData = {
  name: string
  email: string
  password: string
}

const submitForm = async (formData: FormData) => {
  const response = await axios.post(
    `${API_BASE_URL}/one-click-order111`,
    formData
  )
  return response.data
}

const headerType = true

const currentAuthTitle = headerType ? 'Войти' : 'Регистрация'

export const SignInForm = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isChecked, setIsChecked] = useState(false)

  const [name, setName] = useState('')
  // const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [successMessage, setSuccessMessage] = useState('')

  const buttonLabel = useAppSelector(
    (state) => state.modalVisibility.buttonLabel
  )

  const mutation = useMutation(submitForm, {
    onSuccess: () => {
      setSuccessMessage('Мы приняли заявку и свяжемся с Вами в ближайшее время')
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
    // if (!phone) {
    //   alert('Пожалуйста, введите номер телефона')
    //   return
    // }
    const formData = {
      name,
      email,
      password,
    }
    mutation.mutate(formData)
  }

  return (
    <form className={styles.signin_form_container} onSubmit={handleSubmit}>
      <span
        className={styles.signin_form_title}
        // style={{ color: successMessage ? 'green' : 'inherit' }}
      >
        {successMessage || currentAuthTitle}
      </span>
      <input
        ref={inputRef}
        className={styles.signin_form_input}
        type='text'
        placeholder='Имя*'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className={styles.signin_form_input}
        type='email'
        placeholder='Почта*'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
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
        {mutation.isLoading ? 'Отправка...' : buttonLabel}
      </DefaultButton>
      {mutation.isError && (
        <p className={styles.error_message}>
          Ошибка: {(mutation.error as Error).message}
        </p>
      )}
    </form>
  )
}
