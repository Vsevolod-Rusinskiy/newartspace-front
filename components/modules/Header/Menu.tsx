'use client'

import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { closeBurgerMenu } from '@/lib/features/modals/modalsSlice'
import { addOverflowHiddenToBody } from '@/lib/utils/common'
import LangToggler from '@/components/modules/Header/LangToggler'
import styles from '@/styles/burger-menu/burgerMenu.module.scss'

const Menu = () => {
  const burgerIsOpen = useAppSelector((state) => state.modals.burgerMenu)
  const dispatch = useAppDispatch()

  const handleCloseMenu = () => {
    addOverflowHiddenToBody()
    dispatch(closeBurgerMenu())
  }

  return (
    <nav className={`${styles.nav_menu} ${burgerIsOpen ? styles.open : ''}`}>
      <div className={styles.container}>
        <button
          className={`btn_reset ${styles.nav_menu_close} ${burgerIsOpen ? styles.open : ''}`}
          onClick={handleCloseMenu}
        />
        <ul
          className={`${styles.nav_menu_list} ${burgerIsOpen ? styles.open : ''}`}
        >
          <li>
            <Link href='/catalog'>Каталог</Link>
          </li>
          <li>
            <Link href='/names'>Имена</Link>
          </li>
          <li>
            <Link href='/about'>О нас</Link>
          </li>
          <li>
            <Link href='/services'>Услуги</Link>
          </li>
          <li>
            <Link href='/another'>Другое</Link>
          </li>
          <li>
            <Link href='/events'>События</Link>
          </li>
          <li>
            <Link href='/contacts'>Контакты</Link>
          </li>
        </ul>

        <LangToggler />
      </div>
    </nav>
  )
}

export default Menu
