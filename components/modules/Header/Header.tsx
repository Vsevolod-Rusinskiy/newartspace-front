import Link from 'next/link'
import LogoPNG from '@/components/elements/Logo/LogoPNG'
import UserSVG from '@/components/elements/User/UserSVG'
import CartSVG from '@/components/elements/Сart/CartSVG'
import FavoritesSVG from '@/components/elements/Favorites/FavoritesSVG'
import VkSVG from '@/components/elements/Vk/VkSVG'
import TelegramSVG from '@/components/elements/Telegram/TelegramSVG'
import HamburgerSVG from '@/components/elements/Hamburger/HamburgerSVG'
import styles from '../../../styles/header/header.module.scss'

const Header = () => (
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
          <div className={styles.vk}>
            <Link href='/'>
              <VkSVG />
            </Link>
          </div>
          <div className={styles.tg}>
            <Link href='/'>
              <TelegramSVG />
            </Link>
          </div>
        </div>
        <div className={styles.contacts}>
          <p>
            <a className={styles.email} href='mailto:9326215@mail.ru?subject='>
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
        <div className={styles.translation}>
          <button className={`btn_reset`}>RU</button>
          <span>/</span>
          <button className={`btn_reset`}>EN</button>
        </div>
        <div className={styles.hamburger}>
          <button className={`btn_reset`}>
            <HamburgerSVG />
          </button>
        </div>
      </div>
      <div className={styles.middle}>
        <p>Галерея молодых и малоизвестных художников</p>
        <p>Новое пространство</p>
      </div>
      <div className={styles.bottom}>
        <nav className={styles.nav}>
          <Link href='/catalog'>Каталог</Link>
          <Link href='/names'>Имена</Link>
          <Link href='/about'>О нас</Link>
          <Link href='/services'>Услуги</Link>
          <Link href='/another'>Другое</Link>
          <Link href='/events'>События</Link>
          <Link href='/contacts'>Контакты</Link>
        </nav>
      </div>
    </div>
  </header>
)

export default Header
