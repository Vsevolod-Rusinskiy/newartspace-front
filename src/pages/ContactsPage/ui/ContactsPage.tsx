'use client'
import React from 'react'
import { Htag } from '@/src/shared/ui/Htag/Htag'
import { useLang } from '@/src/shared/hooks/useLang'
import styles from './ContactsPage.module.scss'

export const ContactsPage = () => {
  const { lang, translations } = useLang()

  return (
    <main className={styles.main}>
      <section className={`container ${styles.content}`}>
        <div className={styles.title_container}>
          <Htag tag='h1'>{translations[lang].page_titles.contacts}</Htag>
        </div>
        <div className={styles.text_container}>
          <div className={styles.contact_block}>
            <p className={styles.contact_title}>
              {translations[lang].contacts_page.work_time}
            </p>
            <p>
              {translations[lang].contacts_page.work_time_text}{' '}
              <a href='tel:+79219326215' className={styles.contact_link}>
                +7 (921) 932-62-15
              </a>
            </p>
            <p>{translations[lang].contacts_page.welcome}</p>
          </div>

          <div className={styles.contact_block}>
            <p className={styles.contact_title}>
              {translations[lang].contacts_page.address}
            </p>
            <p>
              {translations[lang].individual.address1}{' '}
              {translations[lang].individual.address2}{' '}
              {translations[lang].individual.address3}
            </p>
          </div>

          <div className={styles.contact_block}>
            <p className={styles.contact_title}>
              {translations[lang].contacts_page.contact_us}
            </p>
            <p>
              {translations[lang].contacts_page.phone}:{' '}
              <a href='tel:+79219326215' className={styles.contact_link}>
                +7 (921) 932-62-15
              </a>
            </p>
            <p>
              {translations[lang].contacts_page.email}:{' '}
              <a href='mailto:9326215@mail.ru' className={styles.contact_link}>
                9326215@mail.ru
              </a>
            </p>
          </div>

          <div className={styles.contact_block}>
            <p className={styles.contact_title}>
              {translations[lang].contacts_page.social_networks}
            </p>
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
            <p className={styles.contact_title}>
              {translations[lang].contacts_page.requisites}
            </p>
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
}
