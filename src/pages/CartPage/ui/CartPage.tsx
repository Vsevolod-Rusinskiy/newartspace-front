'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/src/app/model/redux/hooks'
import { RootState } from '@/src/app/model/redux/store'
import {
  initializeCart,
  fetchCartPaintings,
  removeFromCart,
} from '@/src/entities/Cart/model/cartSlice'
import NavigationButton from '@/src/shared/ui/buttons/NavigationButton/NavigationButton'
import { CloseButton } from '@/src/shared/ui/buttons/CloseButton/CloseButton'
import { Price } from '@/src/shared/ui/Price/Price'
import { PaintingDetails } from '@/src/shared/ui/DetailsInfo'
import { NoData } from '@/src/shared/ui/NoData/NoData'
import { Htag } from '@/src/shared/ui/Htag/Htag'
import {
  AnimatedList,
  AnimatedListItem,
} from '@/src/shared/ui/AnimatedList/AnimatedList'
import { CartTotal } from '@/src/widgets/CartTotal'
import styles from './CartPage.module.scss'
import { CartSkeleton } from './CartSkeleton'

export const CartPage = () => {
  const dispatch = useAppDispatch()
  const { cartPaintings, loading } = useSelector(
    (state: RootState) => state.cart
  )

  const isLoading = loading === 'idle' || loading === 'pending'

  useEffect(() => {
    dispatch(initializeCart())
    dispatch(fetchCartPaintings())
  }, [dispatch])

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id))
  }

  const calculateTotalSum = () => {
    return cartPaintings.data.reduce((sum, painting) => {
      if (painting.priceType === 'Специальное предложение') {
        return sum + painting.price
      }

      const price = painting.discount
        ? /* eslint-disable indent */
          Math.round(
            painting.price - (painting.price * painting.discount) / 100
          )
        : painting.price
      return sum + price
    }, 0)
    /* eslint-enable indent */
  }

  return (
    <main className={styles.main}>
      <div className={`container ${styles.navigation_container}`}>
        <NavigationButton direction='back' label='Назад' />
        <Htag tag='h1'>Корзина</Htag>
      </div>

      <div className='container'>
        {isLoading ? (
          <CartSkeleton />
        ) : cartPaintings.data.length === 0 ? (
          <NoData />
        ) : (
          <>
            <AnimatedList className={styles.cart_list}>
              {cartPaintings.data.map((painting) => (
                <AnimatedListItem
                  key={painting.id}
                  className={styles.cart_item}
                  preset='fadeSlide'
                >
                  <div className={styles.item_image}>
                    <Link href={`/${painting.id}`}>
                      <Image
                        src={painting.imgUrl}
                        alt={painting.title}
                        fill
                        className={styles.image}
                      />
                    </Link>
                  </div>

                  <div className={styles.item_content}>
                    <h2 className={styles.item_title}>{painting.title}</h2>
                    <div className={styles.item_details}>
                      <PaintingDetails painting={painting} />
                    </div>
                  </div>

                  <div className={styles.item_right_column}>
                    <div className={styles.item_price}>
                      <Price
                        size='small'
                        price={painting.price}
                        priceType={painting.priceType}
                        discount={painting.discount}
                      />
                    </div>
                    <div className={styles.item_actions}>
                      <CloseButton
                        onClick={() =>
                          handleRemoveFromCart(Number(painting.id))
                        }
                        className={styles.remove_button}
                      />
                    </div>
                  </div>
                </AnimatedListItem>
              ))}
            </AnimatedList>
            <CartTotal totalSum={calculateTotalSum()} />
          </>
        )}
      </div>
    </main>
  )
}
