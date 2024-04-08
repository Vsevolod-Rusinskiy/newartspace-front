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

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
