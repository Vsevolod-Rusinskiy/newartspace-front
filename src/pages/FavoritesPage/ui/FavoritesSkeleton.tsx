import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from './FavoritesPage.module.scss'

export const FavoritesSkeleton = () => {
  return (
    <ul className={styles.favorites_list}>
      {[1, 2].map((item) => (
        <li key={item} className={styles.favorites_item}>
          <div className={styles.item_image}>
            <Skeleton height='100%' />
          </div>
          <div className={styles.item_content}>
            <Skeleton
              height={30}
              width='70%'
              style={{ marginBottom: '10px' }}
            />
            <Skeleton count={4} style={{ marginBottom: '8px' }} />
            <Skeleton height={40} width='50%' style={{ marginTop: '10px' }} />
          </div>
        </li>
      ))}
    </ul>
  )
}
