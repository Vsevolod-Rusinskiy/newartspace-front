import styles from './NoData.module.scss'

export const NoData = () => {
  return (
    <div className={styles.no_data_container}>
      <div className={styles.no_data}>🤷‍♂️</div>
      <div className={styles.no_data_text}>Нет данных</div>
    </div>
  )
}
