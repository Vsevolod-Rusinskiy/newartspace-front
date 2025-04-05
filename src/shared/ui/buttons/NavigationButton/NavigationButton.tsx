import { useRouter } from 'next/navigation'
import styles from './NavigationButton.module.scss'
import { useLang } from '@/src/shared/hooks/useLang'

interface INavigationButtonProps {
  label: string
  direction: string
}

const NavigationButton = ({ label, direction }: INavigationButtonProps) => {
  const router = useRouter()
  const { lang, translations } = useLang()

  const getTranslatedLabel = () => {
    if (direction === 'back' && translations[lang].common.back) {
      return translations[lang].common.back
    }
    return label
  }

  const handleNavigation = () => {
    if (direction === 'back') {
      router.back()
    } else if (direction === 'forward') {
    }
  }

  return (
    <button onClick={handleNavigation} className={styles.navigation_button}>
      {direction === 'back' ? '\u2190' : '\u2192'} {getTranslatedLabel()}
    </button>
  )
}

export default NavigationButton
