export type SortField = 'price' | 'createdAt'
export type SortOrder = 'ASC' | 'DESC'

export type SortParams = [SortField, SortOrder]

export const getSortParams = (
  sortType: 'expensive' | 'cheap' | 'new' | null
): SortParams | undefined => {
  /* eslint-disable indent */
  switch (sortType) {
    case 'expensive':
      return ['price', 'DESC']
    case 'cheap':
      return ['price', 'ASC']
    case 'new':
      return ['createdAt', 'DESC']
    default:
      return undefined
  }
}
