import styles from './DetailsInfo.module.scss'
import { useAppDispatch } from '@/src/app/model/redux/hooks'
import { actionOpenModal } from '@/src/shared/ui/modals/Modal/model/modalVisibilitySlice'

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
    title?: string
    material?: string
    technique?: string
    style?: string
    yearOfCreation?: number
    height?: number
    width?: number
    isReproducible?: boolean
  }
  className?: string
}

const formatValue = (item: DetailsInfoItem) => {
  const { value, type = 'default' } = item

  if (value === '') return ''

  /* eslint-disable indent */
  switch (type) {
    case 'dimensions':
      const [height, width] = (value ?? '').toString().split('x').map(Number)
      return height && width ? `${height} x ${width}` : ''
    case 'list':
      return Array.isArray(value)
        ? value.filter((v) => v ?? false).join(', ')
        : (value?.toString() ?? '')
    default:
      return value?.toString() ?? ''
  }
  /* eslint-enable indent */
}

export const PaintingDetails = ({
  painting,
  className,
}: PaintingDetailsProps) => {
  const dispatch = useAppDispatch()
  const {
    title,
    artist,
    material,
    technique,
    yearOfCreation,
    height,
    width,
    isReproducible,
  } = painting

  const items: DetailsInfoItem[] = [
    { label: 'Автор', value: artist?.artistName },
    { label: 'Размер', value: height && width ? `${height}x${width}` : null },
    {
      label: 'Материалы',
      value: [material, technique].filter(Boolean) as string[],
      type: 'list',
    },
    { label: 'Год', value: yearOfCreation },
  ]

  const handleReproductionClick = () => {
    dispatch(
      actionOpenModal({
        buttonLabel: 'ЗАКАЗАТЬ РЕПРОДУКЦИЮ',
        paintingName: title,
      })
    )
  }

  return (
    <div className={`${styles.details_info} ${className}`}>
      {items.map((item, index) => (
        <p key={index} className={styles.info_item}>
          <span className={styles.label}>{item.label}:</span>{' '}
          {formatValue(item)}
        </p>
      ))}
      {isReproducible && (
        // <Link href='#' className={styles.reproduction_link}>
        //   Возможна репродукция
        // </Link>
        <button
          className={styles.reproduction_button}
          onClick={handleReproductionClick}
        >
          Возможна репродукция
        </button>
      )}
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
