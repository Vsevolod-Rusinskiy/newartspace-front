/* eslint-disable max-len */
interface FavoritesSVGProps {
  className?: string
  isFilled?: boolean
  onClick?: () => void
  withButton?: boolean
}

const FavoritesSVG = ({
  className,
  isFilled,
  onClick,
  withButton = true,
}: FavoritesSVGProps) => {
  const svg = (
    <svg
      viewBox='0 0 80 76'
      xmlns='http://www.w3.org/2000/svg'
      data-filled={isFilled}
    >
      {isFilled ? (
        <path d='M80 28.96L51.24 26.48L40 0L28.76 26.52L0 28.96L21.84 47.88L15.28 76L40 61.08L64.72 76L58.2 47.88L80 28.96Z' />
      ) : (
        <path d='M80 28.96L51.24 26.48L40 0L28.76 26.52L0 28.96L21.84 47.88L15.28 76L40 61.08L64.72 76L58.2 47.88L80 28.96ZM40 53.6L24.96 62.68L28.96 45.56L15.68 34.04L33.2 32.52L40 16.4L46.84 32.56L64.36 34.08L51.08 45.6L55.08 62.72L40 53.6Z' />
      )}
    </svg>
  )

  if (!withButton) {
    return svg
  }

  return (
    <button
      className={className}
      onClick={onClick}
      type='button'
      aria-label={isFilled ? 'Удалить из избранного' : 'Добавить в избранное'}
    >
      {svg}
    </button>
  )
}

export default FavoritesSVG
