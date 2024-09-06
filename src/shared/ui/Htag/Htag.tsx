/* eslint-disable */
import { ReactNode } from 'react'
import styles from './Htag.module.scss'

interface IPageTitleProps {
  children: ReactNode
  tag: 'h1' | 'h2' | 'h3'
}
const Htag = ({ children, tag }: IPageTitleProps) => {
  switch (tag) {
    case 'h1':
      return <h1 className={styles.page_title}>{children}</h1>
    case 'h2':
      return <h2 className={styles.page_title}>{children}</h2>
    case 'h3':
      return <h3 className={styles.page_title}>{children}</h3>
    default:
      return <></>
  }
}

export default Htag
