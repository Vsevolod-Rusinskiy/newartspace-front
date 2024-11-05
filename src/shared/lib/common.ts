export const removeOverflowHiddenFromBody = () => {
  const body = document.querySelector('body') as HTMLBodyElement
  body.classList.remove('overflow-hidden')
}

export const addOverflowHiddenToBody = (paddingRight = '') => {
  const body = document.querySelector('body') as HTMLBodyElement
  body.classList.add('overflow-hidden')
  paddingRight && (body.style.paddingRight = paddingRight)
}

export const getWindowWidth = () => {
  const { innerWidth: windowWidth } =
    typeof window !== 'undefined' ? window : { innerWidth: 0 }

  return { windowWidth }
}

export const formatNumberWithSpaces = (number?: number): string => {
  if (number === undefined || number === null) {
    return 'Цена не указана'
  }
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export const getClassNames = (
  className: string | undefined,
  styles: Record<string, string>
) => {
  if (className) {
    return className
      .split(' ')
      .map((cls) => styles[cls] || cls)
      .join(' ')
  }
  return ''
}
