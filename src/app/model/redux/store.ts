import { configureStore } from '@reduxjs/toolkit'
import { modalsSlice } from '@/src/widgets/Header/ui/Navbar/model/modalsSlice'
import { languageSlice } from '@/src/app/model/languageSlice'
import { paintingsSlice } from '@/src/pages/HomePage/model/homePageSlice'
import { paintingSlice } from '@/src/pages/PaintingCardPage/model/paintingCardItemSlice'
import { artistsSlice } from '@/src/pages/NamesPage/model/namesPageSlice'
import { artistSlice } from '@/src/pages/ArtistCardPage/model/artistCardItemSlice'

export const makeStore = () =>
  configureStore({
    reducer: {
      modals: modalsSlice.reducer,
      language: languageSlice.reducer,
      paintings: paintingsSlice.reducer,
      painting: paintingSlice.reducer,
      artists: artistsSlice.reducer,
      artist: artistSlice.reducer,
      // filteredProducts
    },
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
