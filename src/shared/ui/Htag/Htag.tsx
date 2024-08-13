/* eslint-disable */
import { ReactNode } from 'react'

interface IPageTitleProps {
  children: ReactNode
  tag: 'h1' | 'h2' | 'h3'
}
const Htag = ({ children, tag }: IPageTitleProps) => {
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
