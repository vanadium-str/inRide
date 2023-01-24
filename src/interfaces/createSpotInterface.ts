interface CreateSpotFormElements extends HTMLFormControlsCollection {
    spotName: HTMLInputElement;
    coordinates: HTMLInputElement;
  }
  
  export interface CreateSpotFormElement extends HTMLFormElement {
    readonly elements: CreateSpotFormElements;
  }