'use client'

import Link from 'next/link'
import LogoPNG from '@/components/elements/LogoPNG/LogoPNG'
import UserSVG from '@/components/elements/UserSVG/UserSVG'
import CartSVG from '@/components/elements/СartSVG/CartSVG'
import FavoritesSVG from '@/components/elements/FavoritesSVG/FavoritesSVG'
import HamburgerSVG from '@/components/elements/HamburgerSVG/HamburgerSVG'
import Menu from '@/components/modules/Header/Menu'
import { addOverflowHiddenToBody } from '@/lib/utils/common'
import { openBurgerMenu } from '@/lib/features/modals/modalsSlice'
import { useAppDispatch } from '@/lib/hooks'
import LangToggler from '@/components/modules/Header/LangToggler'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from '@/styles/header/header.module.scss'

const Header = () => {
  const dispatch = useAppDispatch()
  const isMedia970 = useMediaQuery(970)

  const handleOpenMenu = () => {
    addOverflowHiddenToBody()
    dispatch(openBurgerMenu())
  }
  return (
    <header className={styles.header}>
      <div className={`container ${styles.content}`}>
        <div className={styles.top}>
          <div className={styles.logo}>
            <LogoPNG />
            <div className={styles.gallery}>
              <p>Галерея молодых и</p>
              <p>малоизвестных художников</p>
              <p>Новое пространство</p>
            </div>
          </div>
          <div className={styles.social}>
            <a
              className={styles.tg}
              href='https://t.me/newartspace'
              target='_blank'
            />
            <a
              className={styles.vk}
              href='https://vk.com/public207408538'
              target='_blank'
            />
          </div>
          <div className={styles.contacts}>
            <p>
              <a className={styles.email} href='mailto:rodoc461@aersm.com'>
                9326215@mail.ru
              </a>
            </p>
            <p>
              <a className={styles.phone} href='tel:89219326215'>
                +7 (921) 932-62-15
              </a>
            </p>
          </div>
          <div className={styles.work_time}>
            <p>Пн – Пт с 13:00 до 19:00</p>
            <p>Сб – Вс по предварительной договоренности</p>
          </div>
          <div className={styles.links}>
            <div className={styles.cart}>
              <Link href='/'>
                <CartSVG />
              </Link>
            </div>
            <div className={styles.user}>
              <Link href='/'>
                <UserSVG />
              </Link>
            </div>
            <div className={styles.favorites}>
              <Link href='/'>
                <FavoritesSVG />
              </Link>
            </div>
          </div>
          {!isMedia970 && <LangToggler />}
          <div className={styles.hamburger}>
            <button className={`btn_reset`} onClick={handleOpenMenu}>
              <HamburgerSVG />
            </button>
          </div>
          <Menu />
        </div>
        <div className={styles.middle}>
          <p>Галерея молодых и малоизвестных художников</p>
          <p>Новое пространство</p>
        </div>
        <div className={styles.bottom}>
          <nav className={styles.nav}>
            <ul className={`list_reset`}>
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
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
