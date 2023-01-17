export interface EventData {
  admin: string;
  booked: number;
  coordinates: string;
  driver: string;
  event_id: number;
  is_private: number;
  levels: number[];
  max_participants: number;
  min_participants: number;
  price: number;
  spot: string;
  time_end: string;
  time_start: string;
  waiting: number;
}

export const eventDataInitialState: EventData = {
  admin: '',
  booked: 0,
  coordinates: '',
  driver: '',
  event_id: 0,
  is_private: 0,
  levels: [],
  max_participants: 0,
  min_participants: 0,
  price: 0,
  spot: '',
  time_end: '',
  time_start: '',
  waiting: 0,
}