import { RootState } from '@/src/app/model/redux/store'

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn
