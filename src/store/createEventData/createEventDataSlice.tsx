import { createSlice } from "@reduxjs/toolkit";
import { CreateEventDataSliceState } from "../../interfaces/slicesInterfaces";

const initialState: CreateEventDataSliceState = {
  date: "",
  dateEnd: "",
  driver: "יתאן",
  price: "",
  minPlaces: 0,
  maxPlaces: 0,
  privacy: 0,
  spotId: -1,
  trackLevel: [],
  spotName: "",
  coordinates: "",
  spotsList: [],
};

export const createEventDataSlice = createSlice({
  name: "createEventData",
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setDateEnd: (state, action) => {
      state.dateEnd = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setMinPlaces: (state, action) => {
      state.minPlaces = action.payload;
    },
    setMaxPlaces: (state, action) => {
      state.maxPlaces = action.payload;
    },
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
  setDate,
  setDateEnd,
  setPrice,
  setMinPlaces,
  setMaxPlaces,
  setPrivacy,
  setSpotId,
  setTrackLevel,
  setSpotName,
  setCoordinates,
  setSpotsList,
  resetAll,
} = createEventDataSlice.actions;

export default createEventDataSlice.reducer;
