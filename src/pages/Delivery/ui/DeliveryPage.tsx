import React from 'react'
import { Htag } from '@/src/shared/ui/Htag/Htag'
import styles from './Delivery.module.scss'

export const DeliveryPage: React.FC = () => {
  return (
    <main className={styles.main}>
      <section className={`container ${styles.content}`}>
        <div className={styles.title_container}>
          <Htag tag='h1'>Условия оплаты и доставки</Htag>
        </div>
        <div className={styles.text_container} />
      </section>
    </main>
  )
}
