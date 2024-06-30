'use client'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchPaintingById } from '@/lib/features/product/paintingCardItemSlice'
import { PaintingRootState } from '@/types/painting'

interface PaintingCardItemParams {
  params: {
    paintingId: string
  }
}

const PaintingCardItem = (params: PaintingCardItemParams) => {
  const { paintingId } = params.params
  const dispatch = useDispatch()
  const { painting, loading, error } = useSelector(
    (state: PaintingRootState) => state.painting
  )

  useEffect(() => {
    if (paintingId) {
      // @ts-ignore
      dispatch(fetchPaintingById(paintingId))
    }
  }, [dispatch, paintingId])

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
    <div>
      <h1>{painting?.name}</h1>
      <h1>test</h1>
    </div>
  )
}

export default PaintingCardItem
