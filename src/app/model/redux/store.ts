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
    },
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
