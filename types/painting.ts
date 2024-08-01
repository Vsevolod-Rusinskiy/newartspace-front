export interface IPainting {
  id: string
  author: string
  paintingUrl: string
  title: string
  artType: string
  price: number
  theme: string
  style: string
  materials: string
  height: number
  width: number
  yearOfCreation: number
  format: string
  color: string
}

/** Paintings **/

export interface PaintingsState {
  paintings: { data: IPainting[]; total: number }
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null | undefined
}

export interface PaintingsRootState {
  paintings: PaintingsState
}

/** Painting **/

export interface PaintingState {
  painting: IPainting | null
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null | undefined
}

export interface PaintingRootState {
  painting: PaintingState
}
