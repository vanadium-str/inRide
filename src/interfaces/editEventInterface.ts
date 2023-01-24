interface EditEventFormElements extends HTMLFormControlsCollection {
  timeStartEdit: HTMLInputElement;
  timeEndEdit: HTMLInputElement;
}

export interface EditEventFormElement extends HTMLFormElement {
  readonly elements: EditEventFormElements;
}
