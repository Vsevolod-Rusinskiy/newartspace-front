import React from 'react'
import { Htag } from '@/src/shared/ui/Htag/Htag'
import styles from './ContactsPage.module.scss'

export const ContactsPage = () => (
  <main className={styles.main}>
    <section className={`container ${styles.content}`}>
      <div className={styles.title_container}>
        <Htag tag='h1'>Контакты</Htag>
      </div>
      <div className={styles.text_container}>
        <div className={styles.contact_block}>
          <p className={styles.contact_title}>Наш адрес</p>
          <p>
            Санкт-Петербург, ул. Ново-рыбинская, д. 19-21, ЦБ и Т «Квартал», 2
            эт., зал 9
          </p>
        </div>

        <div className={styles.contact_block}>
          <p className={styles.contact_title}>Связаться с нами</p>
          <p>
            Телефон:{' '}
            <a href='tel:+79219326215' className={styles.contact_link}>
              +7 (921) 932-62-15
            </a>
          </p>
          <p>
            E-mail:{' '}
            <a href='mailto:9326215@mail.ru' className={styles.contact_link}>
              9326215@mail.ru
            </a>
          </p>
        </div>

        <div className={styles.contact_block}>
          <p className={styles.contact_title}>Социальные сети</p>
          <div className={styles.social_links}>
            <a
              className={styles.tg}
              href='https://t.me/newartspace'
              target='_blank'
              rel='noopener noreferrer'
            />
            <a
              className={styles.vk}
              href='https://vk.com/public207408538'
              target='_blank'
              rel='noopener noreferrer'
            />
          </div>
        </div>

        <div className={`${styles.contact_block} ${styles.requisites}`}>
          <p className={styles.contact_title}>Реквизиты</p>
          <p>ИП Кабанченко Светлана Геннадьевна</p>
          <p>ОГРНИП 321784700103601</p>
          <p>ИНН 781432217443</p>
          <p>Р/с 40802810200000058334</p>
          <p>К/с 30101810145250000411</p>
          <p>БИК 044525411</p>
        </div>
      </div>
    </section>
  </main>
)
