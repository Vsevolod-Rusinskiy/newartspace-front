import { createSlice } from '@reduxjs/toolkit'
import { AllowedLangs } from '@/types/lang'

const initialState = {
  lang: AllowedLangs.RU,
}

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setEnglishLang: (state) => {
      state.lang = AllowedLangs.EN
    },
    setRussianLang: (state) => {
      state.lang = AllowedLangs.RU
    },
  },
})

export const { setEnglishLang, setRussianLang } = languageSlice.actions
export default languageSlice.reducer
