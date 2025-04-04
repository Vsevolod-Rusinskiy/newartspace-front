'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { useAppDispatch, useAppSelector } from '@/src/app/model/redux/hooks'
import { RootState } from '@/src/app/model/redux/store'
import {
  initializeCart,
  fetchCartPaintings,
  toggleCart,
  syncCartWithServer,
  fetchServerCart,
} from '../model/cartSlice'
import { IPainting } from '@/src/entities/Painting'
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
import { selectIsLoggedIn } from '@/src/features/Auth'
import { useLang } from '@/src/shared/hooks/useLang'

export const CartPage = () => {
  const dispatch = useAppDispatch()
  const { cartPaintings, loading } = useSelector(
    (state: RootState) => state.cart
  )

  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const isLoading = loading === 'idle' || loading === 'pending'
  const { lang, translations } = useLang()

  useEffect(() => {
    dispatch(initializeCart())

    if (isLoggedIn) {
      dispatch(fetchServerCart())
        .unwrap()
        .then(() => {
          dispatch(syncCartWithServer())
        })
        .then(() => {
          dispatch(fetchCartPaintings())
        })
    } else {
      dispatch(fetchCartPaintings())
    }
  }, [dispatch, isLoggedIn])

  const handleToggleCart = (id: number) => {
    dispatch(toggleCart(id))
    if (isLoggedIn) {
      dispatch(syncCartWithServer())
    }
  }

  const calculatePriceWithDiscount = (price: number, discount: number) => {
    return Math.round(price - (price * discount) / 100)
  }

  const calculateItemPrice = (painting: IPainting) => {
    /* eslint-disable indent */
    switch (painting.priceType) {
      case 'Специальное предложение':
        return painting.price
      case 'Скидка':
        return calculatePriceWithDiscount(painting.price, painting.discount)
      default:
        return painting.discount
          ? calculatePriceWithDiscount(painting.price, painting.discount)
          : painting.price
    }
    /* eslint-enable indent */
  }

  const calculateTotalSum = () => {
    return cartPaintings.data.reduce((sum, painting) => {
      return sum + calculateItemPrice(painting)
    }, 0)
  }

  return (
    <main className={styles.main}>
      <div className={`container ${styles.navigation_container}`}>
        <NavigationButton direction='back' label='Назад' />
        <Htag tag='h1'>{translations[lang].page_titles.cart}</Htag>
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
                      <PaintingDetails
                        painting={{
                          ...painting,
                          id: painting.id,
                        }}
                      />
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
                        onClick={() => handleToggleCart(painting.id)}
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
