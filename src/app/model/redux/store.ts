import { configureStore } from '@reduxjs/toolkit'
import { burgerMenuModalSlice } from '@/src/widgets/Header/ui/Navbar/model/burgerMenuModalSlice'
import { languageSlice } from '@/src/app/model/languageSlice'
import { paintingsSlice } from '@/src/pages/HomePage/model/homePageSlice'
import { paintingSlice } from '@/src/pages/PaintingCardPage/model/paintingCardItemSlice'
import { artistsSlice } from '@/src/pages/NamesPage/model/namesPageSlice'
import { artistSlice } from '@/src/pages/ArtistCardPage/model/artistCardItemSlice'
import { sideBarFiltersSlice } from '@/src/widgets/Sidebar/model/sideBarFiltersSlice'
import { sideBarVisibilitySlice } from '@/src/pages/HomePage/model/sideBarVisibilitySlice'

export const makeStore = () =>
  configureStore({
    reducer: {
      burgerMenuModal: burgerMenuModalSlice.reducer,
      language: languageSlice.reducer,
      paintings: paintingsSlice.reducer,
      painting: paintingSlice.reducer,
      artists: artistsSlice.reducer,
      artist: artistSlice.reducer,
      sideBarFilters: sideBarFiltersSlice.reducer,
      sideBarVisibility: sideBarVisibilitySlice.reducer,
    },
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
