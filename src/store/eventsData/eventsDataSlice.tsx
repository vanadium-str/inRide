import { createSlice } from "@reduxjs/toolkit";
import { EventsDataSliceState } from "../../interfaces/slicesInterfaces";

const initialState: EventsDataSliceState = {
  eventsList: [],
  myRuns: [],
  myEvents: [],
  ridersList: [],
  currentEvent: -1,
};

export const eventsDataSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEventsList: (state, action) => {
      state.eventsList = action.payload;
    },
    setMyRuns: (state, action) => {
      state.myRuns = action.payload;
    },
    setMyEvents: (state, action) => {
      state.myEvents = action.payload;
    },
    setRidersList: (state, action) => {
      state.ridersList = action.payload;
    },
    setCurrentEvent: (state, action) => {
      state.currentEvent = action.payload;
    },
  },
});

export const {
  setEventsList,
  setMyRuns,
  setMyEvents,
  setRidersList,
  setCurrentEvent,
} = eventsDataSlice.actions;

export default eventsDataSlice.reducer;
