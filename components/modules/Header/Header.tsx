import styles from '../../../styles/header/header.module.scss'
import LogoSVG from '@/components/elements/Logo/LogoSVG'
import cn from 'classnames'
import Link from 'next/link'

const Header = () => (
  <header className={styles.header}>
    <div className={styles.content}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <LogoSVG />
          <div className={styles.gallery}>
            <p>Галерея молодых и</p>
            <p>малоизвестных художников</p>
            <p>Новое пространство</p>
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
        {/*<div className={styles.links}>*/}
        <ul className={cn('list_reset', styles.links)}>
          <li className={styles.links_item}>
            <Link className={styles.links_item_cart} href='/cart' />
          </li>
          <li className={styles.links_item}>
            <Link className={styles.links_item_user} href='/cart' />
          </li>
          <li className={styles.links_item}>
            <Link className={styles.links_item_favorites} href='/cart' />
          </li>
        </ul>
        {/*</div>*/}
        <div>Lang</div>
      </div>
      <div className={styles.middle}>Галерея молодых</div>
      <div className={styles.bottom}>Меню</div>
    </div>
  </header>
)

export default Header
