import React from 'react'
import styles from './PageTextBlock.module.scss'

interface IPageTextBlockProps {
  text: string
}

const pageTextBlock = ({ text }: IPageTextBlockProps) => (
  <div
    className={styles.page_text_block}
    dangerouslySetInnerHTML={{ __html: text }}
  />
)

export default pageTextBlock
