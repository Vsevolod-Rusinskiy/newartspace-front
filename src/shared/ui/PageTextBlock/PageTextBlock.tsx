import React from 'react'
import styles from './PageTextBlock.module.scss'

interface IPageTextBlockProps {
  text: string
}

const pageTextBlock: React.FC<IPageTextBlockProps> = ({ text }) => (
  <div
    className={styles.page_text_block}
    dangerouslySetInnerHTML={{ __html: text }}
  />
)

export default pageTextBlock
