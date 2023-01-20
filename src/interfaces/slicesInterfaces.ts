import { EventData } from "./eventData";
import { UserData } from "./userData";

export interface UserDataSliceState {
  userId: number | string;
  isAdmin: number;
  email: string;
  phone: string;
  userName: string;
  userData: UserData;
}

export interface CurrentPageSliceState {
  currentPage: string;
}

export interface CreateEventDataSliceState {
  date: string;
  dateEnd: string;
  driver: string;
  price: string;
  minPlaces: number;
  maxPlaces: number;
  privacy: number;
  spotId: number;
  trackLevel: number[];
  spotName: string;
  coordinates: string;
  spotsList: SpotsList[];
}

export interface EventsDataSliceState {
  eventsList: EventData[];
  myRuns: EventData[];
  myEvents: EventData[];
  ridersList: RidersList[];
  currentEvent: number;
}

interface SpotsList {
  coordinates: string;
  level: number[];
  name: string;
  spot_id: number;
}

interface RidersList {
  is_waiting: number;
  name: string;
  phone: number;
}
