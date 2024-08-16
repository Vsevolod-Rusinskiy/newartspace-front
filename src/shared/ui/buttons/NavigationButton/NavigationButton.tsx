import { useRouter } from 'next/navigation'
import styles from './NavigationButton.module.scss'

interface INavigationButtonProps {
  label: string
  direction: string
}

const NavigationButton = ({ label, direction }: INavigationButtonProps) => {
  const router = useRouter()

  const handleNavigation = () => {
    if (direction === 'back') {
      router.back()
    } else if (direction === 'forward') {
      // router.push(router.asPath)
    }
  }

  return (
    <button onClick={handleNavigation} className={styles.navigation_button}>
      {direction === 'back' ? '\u2190' : '\u2192'} {label}
    </button>
  )
}

export default NavigationButton
