import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import { useRouter } from 'next/navigation'
import styles from './NavigationButton.module.scss'

interface INavigationButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label: string
  direction: string
}

const NavigationButton: React.FC<INavigationButtonProps> = ({
  label,
  direction,
}) => {
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
