'use client'
import cn from 'classnames'
import Link from 'next/link'
import LogoPNG from '@/src/shared/ui/svgIcons/LogoPNG'
import UserSVG from '@/src/shared/ui/svgIcons/UserSVG'
import CartSVG from '@/src/shared/ui/svgIcons/CartSVG'
import FavoritesSVG from '@/src/shared/ui/svgIcons/FavoritesSVG'
import HamburgerSVG from '@/src/shared/ui/svgIcons/HamburgerSVG'
import { addOverflowHiddenToBody } from '@/src/shared/lib/common'
import { Navbar } from './Navbar/ui/Navbar'
import { actionOpenBurgerMenu } from './Navbar/model/burgerMenuModalSlice'
import { useAppDispatch, useAppSelector } from '@/src/app/model/redux/hooks'
import { LangToggler } from './LangToggler/ui/LangToggler'
import { useLang } from '@/src/shared/hooks/useLang'
import { menuItems } from '@/src/shared/constants/menuItems'
import { setActiveMenu } from '@/src/app/model/activeMenuSlice'
import styles from './header.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '@/src/app/model/redux/store'
import { initializeFavorites } from '@/src/entities/Favorites/model/favoritesSlice'
import { initializeCart } from '@/src/entities/Cart/model/cartSlice'
import { useEffect } from 'react'
import { CountBadge } from '@/src/shared/ui/CountBadge/CountBadge'

export const Header = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeFavorites())
    dispatch(initializeCart())
  }, [dispatch])

  const activeMenu = useAppSelector((state) => state.activeMenu.activeMenu)

  const handleMenuClick = (href: string) => {
    dispatch(setActiveMenu(href))
  }

  const handleOpenMenu = () => {
    addOverflowHiddenToBody()
    dispatch(actionOpenBurgerMenu())
  }
  const { lang, translations } = useLang()

  const enMainHeaderClass = cn({
    [styles.en_main_header]: lang === 'en',
  })

  const enSubHeaderClass = cn({
    [styles.en_sub_header]: lang === 'en',
  })

  const { favoriteIds, isInitialized } = useSelector(
    (state: RootState) => state.favorites
  )

  const { cartIds, isInitialized: cartIsInitialized } = useSelector(
    (state: RootState) => state.cart
  )

  return (
    <header className={styles.header}>
      <div className={`container ${styles.content}`}>
        <div className={styles.top}>
          <div className={styles.logo}>
            <LogoPNG />
            <div className={styles.gallery}>
              <p>{translations[lang].header.company_name1}</p>
              <p>{translations[lang].header.company_name2}</p>
              <p>{translations[lang].header.company_name3}</p>
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
            <a className={styles.email} href='mailto:rodoc461@aersm.com'>
              9326215@mail.ru
            </a>
            <a className={styles.phone} href='tel:89219326215'>
              +7 (921) 932-62-15
            </a>
          </div>
          <div className={styles.work_time}>
            <p>{translations[lang].header.schedule}</p>
            <p>{translations[lang].header.by_appointment}</p>
          </div>
          <div className={styles.links}>
            <div className={styles.user}>
              <Link href='/profile'>
                <UserSVG />
              </Link>
            </div>
            <div className={styles.cart}>
              <Link href='/cart'>
                <CartSVG withButton={false} />
                {cartIsInitialized && cartIds.length > 0 && (
                  <CountBadge count={cartIds.length} />
                )}
              </Link>
            </div>
            <div className={styles.favorites}>
              <Link href='/favorites'>
                <FavoritesSVG withButton={false} />
                {isInitialized && favoriteIds.length > 0 && (
                  <CountBadge
                    count={favoriteIds.length}
                    className={styles.favorites_count}
                  />
                )}
              </Link>
            </div>
          </div>
          <LangToggler />
          <div className={styles.hamburger}>
            <button className={`btn_reset`} onClick={handleOpenMenu}>
              <HamburgerSVG />
            </button>
          </div>
          <Navbar />
        </div>
        <div className={styles.middle}>
          <Link href='/' className={enSubHeaderClass}>
            {translations[lang].header.sub_header}
          </Link>
          <Link href='/' className={enMainHeaderClass}>
            {translations[lang].header.main_header}
          </Link>
        </div>
        <div className={styles.bottom}>
          <nav className={styles.nav}>
            <ul className={`list_reset`}>
              {menuItems(translations, lang).map(({ href, label }, index) => (
                <li
                  key={index}
                  className={activeMenu === href ? styles.active : ''}
                >
                  <Link href={href} onClick={() => handleMenuClick(href)}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
