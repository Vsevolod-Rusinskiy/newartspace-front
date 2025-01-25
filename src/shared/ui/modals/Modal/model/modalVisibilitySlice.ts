import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalVisibilityState {
  isOpened: boolean
  buttonLabel: string
  paintingId?: number
  cartItemIds?: number[]
}

const initialState: ModalVisibilityState = {
  isOpened: false,
  buttonLabel: '',
  paintingId: undefined,
  cartItemIds: undefined,
}

interface OpenModalPayload {
  buttonLabel: string
  paintingId?: number
  cartItemIds?: number[]
}

export const modalVisibilitySlice = createSlice({
  name: 'modalVisibility',
  initialState,
  reducers: {
    actionToggleModal(state) {
      state.isOpened = !state.isOpened
    },
    actionOpenModal(state, action: PayloadAction<OpenModalPayload>) {
      state.isOpened = true
      state.buttonLabel = action.payload.buttonLabel
      state.paintingId = action.payload.paintingId
      state.cartItemIds = action.payload.cartItemIds
    },
    actionCloseModal(state) {
      state.isOpened = false
      state.paintingId = undefined
      state.cartItemIds = undefined
    },
  },
})

export const { actionToggleModal, actionOpenModal, actionCloseModal } =
  modalVisibilitySlice.actions
