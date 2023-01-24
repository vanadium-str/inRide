import { RootState } from '..';

export const eventsListSelector = (state: RootState) => state.events.eventsList;
export const myRunsSelector = (state: RootState) => state.events.myRuns;
export const myEventsSelector = (state: RootState) => state.events.myEvents;
export const ridersListSelector = (state: RootState) => state.events.ridersList;
export const currentEventSelector = (state: RootState) => state.events.currentEvent;
