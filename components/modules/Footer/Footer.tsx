import Link from 'next/link'
import styles from '../../../styles/footer/footer.module.scss'

export const Footer = () => (
  <footer className={` ${styles.footer}`}>
    <div className={`container ${styles.content}`}>
      <div className={styles.menu}>
        <ul className={styles.nav}>
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
        </ul>
        <ul className={styles.nav}>
          <li>
            <Link href='/events'>События</Link>
          </li>
          <li>
            <Link href='/contacts'>Контакты</Link>
          </li>
          <li>
            <Link href='#'>Условия возврата и доставки</Link>
          </li>
          <a href='#'>Политика персональных данных</a>
          <a href='#'>Договор</a>
        </ul>
        <address className={styles.address}>
          <p>ИП Кабанченко Светлана Геннадьевна</p>
          <p>ИНН 781432217443</p>
          <p>
            Санкт - Петербург, ул. Ново-Рыбинская,
            <br /> д. 19-21, БЦ «Квартал», центральный
            <br /> вход, 2 этаж, пом. 9
          </p>
          <p>
            <a href='tel:89219326215'>Тел: +7 (921) 932-62-15</a>
          </p>
          <p>
            <a href='mailto:9326215@mail.ru?subject='>
              E-mail: 9326215@mail.ru
            </a>
          </p>
        </address>
      </div>
      <div className={styles.rights}>
        <p>
          © 2021 – {new Date().getFullYear()} «Новое пространство». Все права
          защищены и запатентованы
        </p>
      </div>
    </div>
  </footer>
)
