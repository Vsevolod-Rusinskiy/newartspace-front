'use client'
import Link from 'next/link'
import { ActionButton } from '@/src/shared/ui/buttons/ActionButton/ActionButton'

import './OneClickBuyForm.scss'
export const OneClickBuyForm = () => {
  const a = 1
  console.log(a)
  return (
    <div className='form_container'>
      <span className='form_title'>Быстрый заказ</span>
      <input className='form_input' type='text' placeholder='Имя*' />
      <input className='form_input' type='tel' placeholder='Телефон*' />
      <input className='form_input' type='email' placeholder='Почта*' />
      <div className='form_checkbox_container'>
        <input className='form_checkbox' type='checkbox' />
        <span>
          Я согласен{' '}
          <Link href='#' className='form_link'>
            политикой конфиденциальности
          </Link>
        </span>
      </div>
      {/* <button className='form_button'>Отправить</button> */}
      <ActionButton className='custom_button' onClick={() => {}}>
        Заказать в один клик
      </ActionButton>
    </div>
  )
}
