import styles from './DetailsInfo.module.scss'

interface DetailsInfoItem {
  label: string
  value:
    | string
    | number
    | undefined
    | null
    | (string | number | null | undefined)[]
  type?: 'dimensions' | 'list' | 'default'
}

interface DetailsInfoProps {
  items: DetailsInfoItem[]
  className?: string
}

export const DetailsInfo = ({ items, className }: DetailsInfoProps) => {
  const formatValue = (item: DetailsInfoItem) => {
    const { value, type = 'default' } = item

    if (value === null || value === undefined) return ''

    /* eslint-disable indent */
    switch (type) {
      case 'dimensions':
        const [height, width] = value.toString().split('x').map(Number)
        return height && width ? `${height} x ${width}` : ''
      case 'list':
        return Array.isArray(value)
          ? value.filter((v) => v !== null && v !== undefined).join(', ')
          : value.toString()
      default:
        return value.toString()
    }
    /* eslint-enable indent */
  }

  return (
    <div className={`${styles.details_info} ${className}`}>
      {items.map((item, index) => (
        <p key={index} className={styles.info_item}>
          <span className={styles.label}>{item.label}:</span>{' '}
          {formatValue(item)}
        </p>
      ))}
    </div>
  )
}
