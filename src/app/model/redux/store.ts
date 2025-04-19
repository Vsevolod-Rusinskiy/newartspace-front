import { configureStore } from '@reduxjs/toolkit'
import { burgerMenuModalSlice } from '@/src/widgets/Header/ui/Navbar/model/burgerMenuModalSlice'
import { languageSlice } from '@/src/app/model/languageSlice'
import { paintingsSlice } from '@/src/pages/HomePage/model/homePageSlice'
import { paintingSlice } from '@/src/pages/PaintingCardPage/model/paintingCardItemSlice'
import { artistsSlice } from '@/src/pages/NamesPage/model/namesPageSlice'
import { artistSlice } from '@/src/pages/ArtistCardPage/model/artistCardPageSlice'
import { sideBarFiltersSlice } from '@/src/widgets/Sidebar/model/sideBarFiltersSlice'
import { sideBarVisibilitySlice } from '@/src/pages/HomePage/model/sideBarVisibilitySlice'
import { modalVisibilitySlice } from '@/src/shared/ui/modals/Modal/model/modalVisibilitySlice'
import { eventsSlice } from '@/src/pages/EventsPage/model/eventsPageSlice'
import { eventSlice } from '@/src/pages/EventCardPage/model/EventCardPageSlice'
import { activeMenuSlice } from '@/src/app/model/activeMenuSlice'
import { authSlice } from '@/src/features/Auth/sign-in/model/auth/authSlice'
import sortSideBarVisibilityReducer from '@/src/widgets/SortSidebar/model/sortSideBarVisibilitySlice'
import sortReducer from '@/src/widgets/SortSidebar/model/sortSlice'
import favoritesReducer from '@/src/pages/FavoritesPage/model/favoritesSlice'
import cartReducer from '@/src/pages/CartPage/model/cartSlice'
import { welcomeModalSlice } from '@/src/features/WelcomeModal'
import { cookieBannerSlice } from '@/src/features/CookieBanner/model/cookieBannerSlice'

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
      modalVisibility: modalVisibilitySlice.reducer,
      events: eventsSlice.reducer,
      event: eventSlice.reducer,
      activeMenu: activeMenuSlice.reducer,
      auth: authSlice.reducer,
      sortSideBarVisibility: sortSideBarVisibilityReducer,
      sort: sortReducer,
      favorites: favoritesReducer,
      cart: cartReducer,
      welcomeModal: welcomeModalSlice.reducer,
      cookieBanner: cookieBannerSlice.reducer,
    },
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
