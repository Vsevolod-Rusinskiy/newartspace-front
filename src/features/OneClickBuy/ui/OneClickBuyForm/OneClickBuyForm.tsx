'use client'
import Link from 'next/link'
import { ActionButton } from '@/src/shared/ui/buttons/ActionButton/ActionButton'
import { useRef, useEffect, useState } from 'react'
import { useAppSelector } from '@/src/app/model/redux/hooks'
import './OneClickBuyForm.scss'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useMutation } from 'react-query'
import axios from 'axios'
import { API_BASE_URL } from '@/src/shared/config/apiConfig'

type FormData = {
  name: string
  phone: string
  email: string
}

const submitForm = async (formData: FormData) => {
  const response = await axios.post(`${API_BASE_URL}/one-click-order`, formData)
  return response.data
}

export const OneClickBuyForm = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const isOpen = useAppSelector((state) => state.modalVisibility.isOpened)
  const [isChecked, setIsChecked] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

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
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isChecked) {
      alert('Пожалуйста, согласитесь с политикой конфиденциальности')
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
    }
    mutation.mutate(formData)
  }

  return (
    <form className='form_container' onSubmit={handleSubmit}>
      <span
        className='form_title'
        style={{ color: successMessage ? 'green' : 'silver' }}
      >
        {successMessage || 'Быстрый заказ'}
      </span>
      <input
        ref={inputRef}
        className='form_input'
        type='text'
        placeholder='Имя*'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <PhoneInput
        inputClass='form_input phone_input'
        country={'ru'}
        value={phone}
        onChange={(phone) => setPhone(phone)}
        placeholder='Телефон*'
      />
      <input
        className='form_input email_input'
        type='email'
        placeholder='Почта*'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <div className='form_checkbox_container'>
        <input
          className='form_checkbox'
          type='checkbox'
          onChange={(e) => setIsChecked(e.target.checked)}
          required
        />
        <span>
          Я согласен{' '}
          <Link href='#' className='form_link'>
            с политикой конфиденциальности
          </Link>
        </span>
      </div>
      <ActionButton
        className='custom_button'
        type='submit'
        disabled={mutation.isLoading}
      >
        {mutation.isLoading ? 'Отправка...' : 'Заказать в один клик'}
      </ActionButton>
      {mutation.isError && (
        <p className='error_message'>
          Ошибка: {(mutation.error as Error).message}
        </p>
      )}
    </form>
  )
}
