import styles from './PageSubTitle.module.scss'

interface IPageSubTitleProps {
  text: string
}

const pageSubTitle = ({ text }: IPageSubTitleProps) => (
  <h2 className={styles.page_sub_title}>{text}</h2>
)

export default pageSubTitle
