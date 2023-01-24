import { createSlice } from '@reduxjs/toolkit';
import { CreateEventDataSliceState } from '../../interfaces/slicesInterfaces';

const initialState: CreateEventDataSliceState = {
  driver: 'יתאן',
  privacy: 0,
  spotId: -1,
  trackLevel: [],
  spotName: '',
  coordinates: '',
  spotsList: [],
};

export const createEventDataSlice = createSlice({
  name: 'createEventData',
  initialState,
  reducers: {
    setPrivacy: (state, action) => {
      state.privacy = action.payload;
    },
    setSpotId: (state, action) => {
      state.spotId = action.payload;
    },
    setTrackLevel: (state, action) => {
      state.trackLevel = action.payload;
    },
    setSpotName: (state, action) => {
      state.spotName = action.payload;
    },
    setCoordinates: (state, action) => {
      state.coordinates = action.payload;
    },
    setSpotsList: (state, action) => {
      state.spotsList = action.payload;
    },
    resetAll: () => {
      return initialState;
    },
  },
});

export const {
  setPrivacy,
  setSpotId,
  setTrackLevel,
  setSpotName,
  setCoordinates,
  setSpotsList,
  resetAll,
} = createEventDataSlice.actions;

export default createEventDataSlice.reducer;
