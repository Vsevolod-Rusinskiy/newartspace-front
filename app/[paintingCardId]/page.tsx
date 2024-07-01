'use client'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchPaintingById } from '@/lib/features/product/paintingCardItemSlice'
import { PaintingRootState } from '@/types/painting'
import styles from '@/styles/paintingCard/paintingCard.module.scss'

interface PaintingCardItemParams {
  params: {
    paintingCardId: string
  }
}

const PaintingCardItem = (params: PaintingCardItemParams) => {
  const { paintingCardId } = params.params
  const dispatch = useDispatch()
  const { painting, loading, error } = useSelector(
    (state: PaintingRootState) => state.painting,
  )

  useEffect(() => {
    if (paintingCardId) {
      // @ts-ignore
      dispatch(fetchPaintingById(paintingCardId))
    }
  }, [dispatch, paintingCardId])

  useEffect(() => {
    if (loading === 'pending') {
      console.log('Paintings loaded:', painting)
    }
    if (loading === 'failed') {
      console.error('Error loading paintings:', error)
    }
  }, [loading, painting, error])

  if (loading === 'pending') return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <main className={styles.main}>
      <article className={`container ${styles.content}`}>
        <h1>{painting?.name}</h1>
        <h1>{painting?.paintingUrl}</h1>
      </article>
    </main>
  )
}

export default PaintingCardItem
