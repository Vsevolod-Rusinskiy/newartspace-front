import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'
import React from 'react'

interface Paginate {
  pageCount: number
  onPageChange: (selectedItem: { selected: number }) => void
  forcePage: number
}

export const Paginate = ({ pageCount, onPageChange, forcePage }: Paginate) => (
  <ReactPaginate
    previousLabel={forcePage === 0 ? '' : '<'}
    nextLabel={forcePage === pageCount - 1 ? '' : '>'}
    breakLabel={'...'}
    breakClassName={styles.breakMe}
    pageCount={pageCount}
    marginPagesDisplayed={2}
    pageRangeDisplayed={3}
    onPageChange={onPageChange}
    containerClassName={styles.pagination}
    previousClassName={styles.previous}
    nextClassName={styles.next}
    activeClassName={styles.active}
  />
)
