import { RootState } from "..";

export const dateSelector = (state: RootState) => state.createEventData.date;
export const dateEndSelector = (state: RootState) =>
  state.createEventData.dateEnd;
export const driverSelector = (state: RootState) =>
  state.createEventData.driver;
export const priceSelector = (state: RootState) => state.createEventData.price;
export const minPlacesSelector = (state: RootState) =>
  state.createEventData.minPlaces;
export const maxPlacesSelector = (state: RootState) =>
  state.createEventData.maxPlaces;
export const privacySelector = (state: RootState) =>
  state.createEventData.privacy;
export const spotIdSelector = (state: RootState) =>
  state.createEventData.spotId;
export const trackLevelSelector = (state: RootState) =>
  state.createEventData.trackLevel;
export const spotNameSelector = (state: RootState) =>
  state.createEventData.spotName;
export const coordinatesSelector = (state: RootState) =>
  state.createEventData.coordinates;
export const spotsListSelector = (state: RootState) =>
  state.createEventData.spotsList;
