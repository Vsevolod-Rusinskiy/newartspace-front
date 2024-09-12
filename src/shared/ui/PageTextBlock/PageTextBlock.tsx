import React, { forwardRef } from 'react'
import styles from './PageTextBlock.module.scss'

interface IPageTextBlockProps {
  text: string
}

const PageTextBlock = forwardRef<HTMLDivElement, IPageTextBlockProps>(
  ({ text }, ref) => (
    <div
      ref={ref}
      className={styles.page_text_block}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  )
)
PageTextBlock.displayName = 'PageTextBlock'

export default PageTextBlock
