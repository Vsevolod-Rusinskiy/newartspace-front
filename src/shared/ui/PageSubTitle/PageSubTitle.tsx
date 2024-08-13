import React from 'react'
import styles from './PageSubTitle.module.scss'

interface IPageSubTitleProps {
  text: string
}

const pageSubTitle: React.FC<IPageSubTitleProps> = ({ text }) => (
  <h2 className={styles.page_sub_title}>{text}</h2>
)

export default pageSubTitle
