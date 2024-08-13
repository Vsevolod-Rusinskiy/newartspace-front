/* eslint-disable */
import React, { ReactNode } from 'react'

interface IPageTitleProps {
  children: ReactNode
  tag: 'h1' | 'h2' | 'h3'
}
const Htag: React.FC<IPageTitleProps> = ({ children, tag }) => {
  switch (tag) {
    case 'h1':
      return <h1>{children}</h1>
    case 'h2':
      return <h2>{children}</h2>
    case 'h3':
      return <h3>{children}</h3>
    default:
      return <></>
  }
}

export default Htag
