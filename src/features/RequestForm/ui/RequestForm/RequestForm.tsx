'use client'
import { useRef, useEffect, useState, useCallback } from 'react'
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
import Link from 'next/link'

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
  deliveryMethod?: string
}

type FormData = {
  name: string
  phone: string
  email: string
  paintingId?: number
  cartItemIds?: number[]
  deliveryMethod?: string
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
        deliveryMethod: formData.deliveryMethod,
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
  const [isAgreementChecked, setIsAgreementChecked] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [deliveryMethod, setDeliveryMethod] = useState('pickup')
  const [successMessage, setSuccessMessage] = useState('')
  const { lang, translations } = useLang()
  const buttonLabel = useAppSelector(
    (state) => state.modalVisibility.buttonLabel
  )

  const completeReset = useCallback(() => {
    setName('')
    setPhone('')
    setEmail('')
    setIsChecked(false)
    setIsAgreementChecked(false)
    setSuccessMessage('')
  }, [])

  useEffect(() => {
    if (!isOpen) {
      completeReset()
    }
  }, [isOpen, completeReset])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const mutation = useMutation(submitForm, {
    onSuccess: () => {
      const part1 = 'Уважаемый Коллекционер!\n\nБлагодарим за Ваш выбор!\n\n'
      // Разбиваем длинную строку на части, чтобы обойти ограничение длины строки
      const part2a =
        'Наши творения уникальны и представлены в Галерее в единичном экземпляре, поэтому '
      const part2b =
        'для завершения покупки необходимо дождаться письма, подтверждающего наличие '
      const part2c = 'выбранных Вами товаров.\n\n'
      const part3 =
        'Если Вы не получили письмо в течении дня, пожалуйста, проверьте не находится ли оно в Спаме.\n'
      const part4 =
        'Также для уточнения информации возможно написать на почту EMAIL или по телефону PHONE'

      setSuccessMessage(part1 + part2a + part2b + part2c + part3 + part4)
      setName('')
      setPhone('')
      setEmail('')
      setIsChecked(false)
      setIsAgreementChecked(false)
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error ? error.message : 'Неизвестная ошибка'
      console.error('Ошибка: ' + errorMessage)
    },
  })

  const handleDeliveryMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeliveryMethod(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isChecked) {
      alert('Пожалуйста, согласитесь с политикой персональных данных')
      return
    }
    if (!isAgreementChecked) {
      alert('Пожалуйста, примите условия оферты')
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
      deliveryMethod,
      formType,
    }
    mutation.mutate(formData)
  }

  return (
    <form className={styles.form_container} onSubmit={handleSubmit}>
      {!successMessage ? (
        <>
          <span className={styles.form_title}>{buttonLabel}</span>

          <input
            ref={inputRef}
            className={styles.form_input}
            type='text'
            placeholder={translations[lang].cart_page.name_placeholder}
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
          />
          <input
            className={cn(styles.form_input, styles.email_input)}
            type='email'
            placeholder={translations[lang].cart_page.email_placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {formType === 'cart' && (
            <div className={styles.delivery_method}>
              <div className={styles.delivery_title}>
                {translations[lang].cart_page.delivery_method}:
              </div>
              <div className={styles.delivery_options}>
                <label className={styles.delivery_option}>
                  <input
                    type='radio'
                    name='delivery_method'
                    value='delivery'
                    checked={deliveryMethod === 'delivery'}
                    onChange={handleDeliveryMethodChange}
                  />
                  {translations[lang].cart_page.delivery}
                </label>
                <label className={styles.delivery_option}>
                  <input
                    type='radio'
                    name='delivery_method'
                    value='pickup'
                    checked={deliveryMethod === 'pickup'}
                    onChange={handleDeliveryMethodChange}
                  />
                  {translations[lang].cart_page.pickup}
                </label>
              </div>
            </div>
          )}
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

          <div className={styles.form_checkbox_container}>
            <input
              className={styles.form_checkbox}
              type='checkbox'
              checked={isAgreementChecked}
              onChange={(e) => setIsAgreementChecked(e.target.checked)}
              required
            />
            <span>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {(translations[lang].cart_page as any).offer_agreement
                .split(' ')
                .slice(0, 2)
                .join(' ')}{' '}
              <Link href='/contract' className={styles.form_link}>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(translations[lang].cart_page as any).offer_agreement
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
        </>
      ) : (
        <div className={styles.success_message_container}>
          {successMessage.split('\n').map((line, index) => {
            if (line.includes('EMAIL') || line.includes('PHONE')) {
              return (
                <p key={index} className={styles.success_message_text}>
                  {line.split('EMAIL')[0]}
                  <a
                    href='mailto:9326215@mail.ru'
                    className={styles.contact_link}
                  >
                    9326215@mail.ru
                  </a>
                  {line.split('EMAIL')[1].split('PHONE')[0]}
                  <a href='tel:+79219326215' className={styles.contact_link}>
                    +7(921)932-62-15
                  </a>
                </p>
              )
            }
            return (
              <p key={index} className={styles.success_message_text}>
                {line}
              </p>
            )
          })}
        </div>
      )}

      {mutation.isError && (
        <p className={styles.error_message}>
          Ошибка: {(mutation.error as Error).message}
        </p>
      )}
    </form>
  )
}
