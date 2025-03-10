import React from 'react'
import '../../temp/styles.css'
import { Htag } from '@/src/shared/ui/Htag/Htag'
import styles from './AboutPage.module.scss'
import aboutImage from '../assets/about-image.jpg'
import Image from 'next/image'

export const AboutPage = () => (
  <main className={styles.main}>
    <section className={`container ${styles.content}`}>
      <div className={styles.title_container}>
        <Htag tag='h1'>О нас</Htag>
      </div>
      <div className={styles.about_image_container}>
        <Image
          src={aboutImage}
          alt='О нас'
          className={styles.about_image}
          priority
        />
      </div>
      <div className={styles.text_container}>
        <p>
          Галерея молодых и малоизвестных Художников &quot;Новое
          пространство&quot; создана для развития и продвижения художников,
          которые нашли вдохновение в этом деле, так же как и основательница
          Галереи – Кабанченко Светлана, которая лишь недавно вновь открыла свое
          художественное призвание после долгих тщетных поисков любимой
          деятельности, и только после того, как Родители на День Рождения
          подарили всё для живописи, пришло осознание, что это дело-именно то, к
          которому стремилась ее душа. Также, Родные Люди поддержали в открытии
          Галереи, смысл и идея которой в открытии Художников-единомышленников,
          в основу картин которых заложены проявления любви к Жизни, несущие в
          себе добрый посыл, вызывающие радость, счастье и / или спокойствие,
          умиротворение, основанные на собственном мировоззрении и
          непосредственных идеях в единственном экземпляре с авторским
          подчерком.
        </p>
        <div className={styles.signature_container}>
          <p>
            С уважением, <br />
            Художник Кабанченко Светлана *КСГ*
          </p>
          <p className={styles.photographer_info}>
            Фотография создана: Максим{' '}
            <a href='tel:+79019715611' className={styles.phone_link}>
              +7 (901) 971-56-11
            </a>
            , theater-photos.ru
          </p>
        </div>
      </div>
    </section>
  </main>
)
