import { configureStore } from '@reduxjs/toolkit';
import { userDataSlice } from './userData/userDataSlice';
import { currentPageSlice } from './currentPage/currentPageSlice';
import { createEventDataSlice } from './createEventData/createEventDataSlice';
import { eventsDataSlice } from './eventsData/eventsDataSlice';

export const store = configureStore({
  reducer: {
    user: userDataSlice.reducer,
    page: currentPageSlice.reducer,
    createEventData: createEventDataSlice.reducer,
    events: eventsDataSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
