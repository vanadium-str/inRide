import { createSlice } from '@reduxjs/toolkit';
import { events } from '../../utils/constants';
import { CurrentPageSliceState } from '../../interfaces/slicesInterfaces';

const initialState: CurrentPageSliceState = {
  currentPage: events,
};

export const currentPageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPage } = currentPageSlice.actions;

export default currentPageSlice.reducer;
