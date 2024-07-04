import { configureStore } from '@reduxjs/toolkit'
import { modalsSlice } from '@/lib/features/modals/modalsSlice'
import { languageSlice } from '@/lib/features/language/languageSlice'
import { paintingsSlice } from '@/lib/features/homePage/homePageSlice'
import { paintingSlice } from '@/lib/features/painting/paintingCardItemSlice'

export const makeStore = () =>
  configureStore({
    reducer: {
      modals: modalsSlice.reducer,
      language: languageSlice.reducer,
      paintings: paintingsSlice.reducer,
      painting: paintingSlice.reducer,
    },
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
