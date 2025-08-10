export interface IArtist {
  artistName: string
}

export interface IPainting {
  id: number
  author: string
  imgUrl: string
  title: string
  artType: string
  priceType: string
  price: number
  discount: number
  style: string
  theme: string
  material: string
  technique: string
  height: number
  width: number
  yearOfCreation: number
  format: string
  color: string
  description: string
  isReproducible: boolean
  artist: IArtist
  isAdult: boolean
}
