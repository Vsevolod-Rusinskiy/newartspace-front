import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from './OrderHistory.module.scss'

export const OrderHistorySkeleton = () => {
  return (
    <div className={styles.order_history}>
      {[1, 2].map((order) => (
        <div key={order} className={styles.order_card}>
          <div className={styles.order_header}>
            <div className={styles.order_info}>
              <Skeleton
                height={24}
                width={120}
                style={{ marginBottom: '8px' }}
              />
              <Skeleton
                height={16}
                width={100}
                style={{ marginBottom: '8px' }}
              />
              <Skeleton height={16} width={150} />
            </div>
            <Skeleton height={24} width={80} />
          </div>

          <div className={styles.order_items}>
            {[1, 2].map((item) => (
              <div key={item} className={styles.order_item}>
                <div className={styles.item_image}>
                  <Skeleton height={100} width={100} />
                </div>
                <div className={styles.item_info}>
                  <Skeleton
                    height={20}
                    width='80%'
                    style={{ marginBottom: '10px' }}
                  />
                  <div className={styles.item_details}>
                    <Skeleton height={16} width={100} />
                    <Skeleton height={16} width={100} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
