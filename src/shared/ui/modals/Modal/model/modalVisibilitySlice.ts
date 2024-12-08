import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalVisibilityState {
  isOpened: boolean
  buttonLabel: string
}

const initialState: ModalVisibilityState = {
  isOpened: false,
  buttonLabel: 'КУПИТЬ В ОДИН КЛИК',
}

export const modalVisibilitySlice = createSlice({
  name: 'modalVisibility',
  initialState,
  reducers: {
    actionToggleModal(state) {
      state.isOpened = !state.isOpened
    },
    actionOpenModal(state, action: PayloadAction<string>) {
      state.isOpened = true
      state.buttonLabel = action.payload
    },
    actionCloseModal(state) {
      state.isOpened = false
    },
  },
})

export const { actionToggleModal, actionOpenModal, actionCloseModal } =
  modalVisibilitySlice.actions
