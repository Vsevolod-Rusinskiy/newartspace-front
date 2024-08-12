import React from 'react'
import styles from './PageTitle.module.scss'

interface IPageTitleProps {
  label: string
}

const pageTitle: React.FC<IPageTitleProps> = ({ label }) => (
  <div className={styles.page_title}>{label}</div>
)

export default pageTitle
