import styles from './DetailsInfo.module.scss'
import { useAppDispatch } from '@/src/app/model/redux/hooks'
import { actionOpenModal } from '@/src/shared/ui/modals/Modal/model/modalVisibilitySlice'
import { useLang } from '@/src/shared/hooks/useLang'

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
    id?: number
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
  const { lang, translations } = useLang()
  const {
    id,
    artist,
    material,
    technique,
    yearOfCreation,
    height,
    width,
    isReproducible,
  } = painting

  const items: DetailsInfoItem[] = [
    {
      label: translations[lang].painting_details.author,
      value: artist?.artistName,
    },
    {
      label: translations[lang].painting_details.size,
      value: height && width ? `${height}x${width}` : null,
    },
    {
      label: translations[lang].painting_details.materials,
      value: [material, technique].filter(Boolean) as string[],
      type: 'list',
    },
    {
      label: translations[lang].painting_details.year,
      value: yearOfCreation,
    },
  ]

  const handleReproductionClick = () => {
    dispatch(
      actionOpenModal({
        buttonLabel: 'ЗАКАЗАТЬ РЕПРОДУКЦИЮ',
        paintingId: id,
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
          {translations[lang].painting_details.reproduction}
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
