import styles from '../../styles/footer/index.module.scss'
import cn from 'classnames'
import { format } from 'date-fns'
import Link from 'next/link'

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.content}>
      <div className={styles.footer_menu}>
        <nav className={cn(styles.nav_left, styles.menu_item)}>
          <Link href='/catalog'>Каталог</Link>
          <Link href='/names'>Имена</Link>
          <Link href='/about'>О нас</Link>
          <Link href='/services'>Услуги</Link>
          <Link href='/another'>Другое</Link>
        </nav>
        <nav className={cn(styles.nav_right, styles.menu_item)}>
          <Link href='/events'>События</Link>
          <Link href='/contacts'>Контакты</Link>
          <Link href='#'>Условия возврата и доставки</Link>
          <a href='#'>Политика персональных данных</a>
          <a href='#'>Договор</a>
        </nav>
        <address className={cn(styles.address, styles.menu_item)}>
          <p>ИП Кабанченко Светлана Геннадьевна</p>
          <p>ИНН 781432217443</p>
          <p>
            Санкт - Петербург, ул. Ново-Рыбинская,
            <br />
            д. 19-21, БЦ «Квартал», центральный <br />
            вход, 2 этаж, пом. 9
          </p>
          <p>
            <a href='tel:89219326215'>Тел: +7 (921) 932-62-15</a>
          </p>
          <p>
            <a href='mailto:9326215@mail.ru?subject='>E-mail:9326215@mail.ru</a>
          </p>
        </address>
      </div>
      <div className={styles.rights}>
        <p>
          © 2021 – {format(new Date(), 'yyyy')} «Новое пространство». Все права
          защищены и запатентованы
        </p>
      </div>
    </div>
  </footer>
)
