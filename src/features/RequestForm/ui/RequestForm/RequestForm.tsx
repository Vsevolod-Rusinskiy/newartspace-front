'use client'
import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import { useAppSelector } from '@/src/app/model/redux/hooks'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useMutation } from 'react-query'
import axios from 'axios'
import { API_BASE_URL } from '@/src/shared/config/apiConfig'
import { DefaultButton } from '@/src/shared/ui/buttons/DefaultButton/DefaultButton'
import styles from './RequestForm.module.scss'
import cn from 'classnames'
import { useLang } from '@/src/shared/hooks/useLang'

export type FormType = 'reproduction' | 'cart'

interface RequestFormProps {
  formType: FormType
  paintingId?: number
  cartItemIds?: number[]
}

interface RequestFormData {
  name: string
  phone: string
  email: string
  paintingId?: number
  cartItemIds?: number[]
}

type FormData = {
  name: string
  phone: string
  email: string
  paintingId?: number
  cartItemIds?: number[]
  formType: FormType
}

const submitForm = async (formData: FormData) => {
  let endpoint: string
  let requestData: RequestFormData

  /* eslint-disable */
  switch (formData.formType) {
    case 'reproduction':
      endpoint = '/request-form/reproduction'
      requestData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        paintingId: formData.paintingId,
      }
      break
    case 'cart':
      endpoint = '/request-form/cart'
      requestData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        cartItemIds: formData.cartItemIds,
      }
      break
    default:
      throw new Error('Неизвестный тип формы')
  }
  /* eslint-enable */
  console.log('Отправляем данные:', {
    ...requestData,
    endpoint: `${API_BASE_URL}${endpoint}`,
    formType: formData.formType,
  })

  const response = await axios.post(`${API_BASE_URL}${endpoint}`, requestData)
  return response.data
}

export const RequestForm = ({
  formType,
  paintingId,
  cartItemIds,
}: RequestFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const isOpen = useAppSelector((state) => state.modalVisibility.isOpened)
  const [isChecked, setIsChecked] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const buttonLabel = useAppSelector(
    (state) => state.modalVisibility.buttonLabel
  )
  const { lang, translations } = useLang()

  const resetForm = () => {
    setName('')
    setPhone('')
    setEmail('')
    setIsChecked(false)
  }

  const mutation = useMutation(submitForm, {
    onSuccess: () => {
      setSuccessMessage('Мы приняли заявку и свяжемся с Вами в ближайшее время')
      resetForm()
      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error ? error.message : 'Неизвестная ошибка'
      console.error('Ошибка: ' + errorMessage)
    },
  })

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isChecked) {
      alert('Пожалуйста, согласитесь с персональных данных')
      return
    }
    if (!phone) {
      alert('Пожалуйста, введите номер телефона')
      return
    }
    const formData = {
      name,
      phone,
      email,
      paintingId,
      cartItemIds,
      formType,
    }
    mutation.mutate(formData)
  }

  return (
    <form className={styles.form_container} onSubmit={handleSubmit}>
      <span className={styles.form_title}>{successMessage || buttonLabel}</span>
      <input
        ref={inputRef}
        className={styles.form_input}
        type='text'
        placeholder='Имя*'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <PhoneInput
        inputClass={cn(styles.form_input, styles.phone_input)}
        country={'ru'}
        value={phone}
        onChange={(phone) => setPhone(phone)}
        placeholder={translations[lang].cart_page.phone_placeholder}
        inputProps={{
          autoComplete: 'tel',
          required: true,
        }}
      />
      <input
        className={cn(styles.form_input, styles.email_input)}
        type='email'
        placeholder='Почта*'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
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
          {translations[lang].cart_page.privacy_agreement
            .split(' ')
            .slice(0, 2)
            .join(' ')}{' '}
          <Link href='/privacy-policy' className={styles.form_link}>
            {translations[lang].cart_page.privacy_agreement
              .split(' ')
              .slice(2)
              .join(' ')}
          </Link>
        </span>
      </div>
      <DefaultButton
        className='action_button'
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
