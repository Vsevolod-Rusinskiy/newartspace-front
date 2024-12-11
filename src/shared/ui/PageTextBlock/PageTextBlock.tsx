import React, { forwardRef } from 'react'
import cn from 'classnames'
import styles from './PageTextBlock.module.scss'

interface IPageTextBlockProps {
  text: string
  className?: string
}

const PageTextBlock = forwardRef<HTMLDivElement, IPageTextBlockProps>(
  ({ text, className }, ref) => (
    <div
      ref={ref}
      className={cn(styles.page_text_block, className)}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  )
)
PageTextBlock.displayName = 'PageTextBlock'

export default PageTextBlock
