interface CreateEventFormElements extends HTMLFormControlsCollection {
  date: HTMLInputElement;
  timeStart: HTMLInputElement;
  timeEnd: HTMLInputElement;
  price: HTMLInputElement;
  minPlaces: HTMLInputElement;
  maxPlaces: HTMLInputElement;
}

export interface CreateEventFormElement extends HTMLFormElement {
  readonly elements: CreateEventFormElements;
}

export interface CreatedEvent {
  date: string;
  maxPlaces: number;
  minPlaces: number;
  price: number;
  timeEnd: string;
  timeStart: string;
}
