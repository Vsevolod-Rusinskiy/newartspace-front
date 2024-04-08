import { configureStore } from '@reduxjs/toolkit'
import { modalsSlice } from '@/lib/features/modals/modalsSlice'
import { languageSlice } from '@/lib/features/language/languageSlice'

export const makeStore = () =>
  configureStore({
    reducer: {
      modals: modalsSlice.reducer,
      language: languageSlice.reducer,
    },
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
