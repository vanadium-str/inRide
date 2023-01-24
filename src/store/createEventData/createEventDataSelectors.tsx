import { RootState } from '..';

export const driverSelector = (state: RootState) => state.createEventData.driver;
export const privacySelector = (state: RootState) => state.createEventData.privacy;
export const spotIdSelector = (state: RootState) => state.createEventData.spotId;
export const trackLevelSelector = (state: RootState) => state.createEventData.trackLevel;
export const spotNameSelector = (state: RootState) => state.createEventData.spotName;
export const coordinatesSelector = (state: RootState) => state.createEventData.coordinates;
export const spotsListSelector = (state: RootState) => state.createEventData.spotsList;
