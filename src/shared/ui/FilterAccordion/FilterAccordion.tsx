// import styles from './FilterAccordion.module.scss'

interface IFilterCheckboxItem {
  title: string
}

// interface IFilterAccordionProps {
//   itemsList: IFilterCheckboxItem
//   checked: boolean
//   id?: string
// }

const FilterAccordionProps = ({ title }: IFilterCheckboxItem) => (
  <div>{title}</div>
)

export default FilterAccordionProps
