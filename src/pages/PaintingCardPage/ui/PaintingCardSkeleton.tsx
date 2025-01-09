import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from './PaintingCardPage.module.scss'

export const PaintingCardSkeleton = () => {
  return (
    <>
      <section className={`${styles.image_container} ${styles.section}`}>
        <Skeleton style={{ width: '100%', height: '100%' }} />
      </section>
      <section className={`${styles.details_container} ${styles.section}`}>
        <Skeleton height={50} style={{ marginBottom: '32px' }} />
        <Skeleton count={5} style={{ marginBottom: '8px' }} />
        <Skeleton
          height={60}
          style={{ marginBottom: '32px', marginTop: '32px' }}
        />
        <Skeleton height={45} count={2} style={{ marginBottom: '15px' }} />
      </section>
      <section className={styles.section}>
        <Skeleton height={30} style={{ marginBottom: '16px' }} />
        <Skeleton count={3} />
      </section>
    </>
  )
}
