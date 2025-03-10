/* eslint-disable max-len */
interface CartSVGProps {
  className?: string
  isFilled?: boolean
  onClick?: () => void
  withButton?: boolean
}

const CartSVG = ({
  className,
  isFilled,
  onClick,
  withButton = true,
}: CartSVGProps) => {
  const svg = (
    <svg
      viewBox='0 0 18 20'
      xmlns='http://www.w3.org/2000/svg'
      data-filled={isFilled}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M3.35968 4.96333L2.48272 16.89C2.41879 17.7594 3.10692 18.5 3.97868 18.5H14.0211C14.8929 18.5 15.581 17.7594 15.5171 16.89L14.6403 4.96334C14.6211 4.70213 14.4035 4.5 14.1416 4.5H12.9955L12.9956 6.99994L11.4956 7L11.4955 4.5H6.50016L6.50006 7L5.00006 6.99994L5.00016 4.5H3.85833C3.59641 4.5 3.37889 4.70212 3.35968 4.96333ZM5.00023 3H3.85833C2.81066 3 1.94054 3.80849 1.86372 4.85334L0.986756 16.78C0.858902 18.5188 2.23516 20 3.97868 20H14.0211C15.7646 20 17.1409 18.5188 17.0131 16.78L16.1362 4.85336C16.0594 3.8085 15.1893 3 14.1416 3H12.9954L12.9954 2.74988C12.9953 1.23115 11.7641 0 10.2454 0H7.75024C6.2315 0 5.0003 1.23115 5.00024 2.74989L5.00023 3ZM6.50023 3L6.50024 2.74995C6.50027 2.05961 7.0599 1.5 7.75024 1.5H10.2454C10.9357 1.5 11.4954 2.05961 11.4954 2.74995L11.4954 3H6.50023Z'
      />
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
      aria-label={isFilled ? 'Удалить из корзины' : 'Добавить в корзину'}
    >
      {svg}
    </button>
  )
}

export default CartSVG
