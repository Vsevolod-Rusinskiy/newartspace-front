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

interface PaintingDetailsProps {
  painting: {
    artist?: { artistName?: string }
    material?: string
    technique?: string
    style?: string
    yearOfCreation?: number
    height?: number
    width?: number
  }
  className?: string
}

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

export const PaintingDetails = ({
  painting,
  className,
}: PaintingDetailsProps) => {
  const { artist, material, technique, style, yearOfCreation, height, width } =
    painting

  const items: DetailsInfoItem[] = [
    { label: 'Автор', value: artist?.artistName },
    {
      label: 'Материалы',
      value: [material, technique].filter(Boolean) as string[],
      type: 'list',
    },
    { label: 'Стиль', value: style },
    { label: 'Год', value: yearOfCreation },
    {
      label: 'Размер',
      value: height && width ? `${height}x${width}` : null,
      type: 'dimensions',
    },
  ]

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

export const DetailsInfo = ({ items, className }: DetailsInfoProps) => {
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
