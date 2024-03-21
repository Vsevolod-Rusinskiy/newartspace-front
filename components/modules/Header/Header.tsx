import styles from '../../../styles/header/header.module.scss'
import LogoSVG from '@/components/elements/Logo/LogoSVG'

const Header = () => (
  <header className={styles.header}>
    <div className={styles.content}>
      <div className={styles.top}>
        <div className={styles.top}>
          <div className={styles.logo}>
            <LogoSVG />
            <div className={styles.gallery}>
              <p>Галерея молодых и</p>
              <p>малоизвестных художников</p>
              <p>Новое пространство</p>
            </div>
          </div>
        </div>
        <div>address</div>
        <div>work time</div>
        <div>???</div>
        <div>Lang</div>
      </div>
      <div className={styles.middle}>Галерея молодых</div>
      <div className={styles.bottom}>Меню</div>
    </div>
  </header>
)

export default Header
