import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from './CartPage.module.scss'

export const CartSkeleton = () => {
  return (
    <ul className={styles.cart_list}>
      {[1, 2].map((item) => (
        <li key={item} className={styles.cart_item}>
          <div className={styles.item_image}>
            <Skeleton height='100%' />
          </div>
          <div className={styles.item_content}>
            <Skeleton
              height={24}
              width='60%'
              style={{ marginBottom: '10px' }}
            />
            <Skeleton count={3} style={{ marginBottom: '8px' }} />
          </div>
          <div className={styles.item_right_column}>
            <div className={styles.item_price}>
              <Skeleton height={30} width='100%' />
            </div>
            <div className={styles.item_actions}>
              <Skeleton height={40} width='100%' />
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
