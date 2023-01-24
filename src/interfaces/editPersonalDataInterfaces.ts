interface EditPersonalDataFormElements extends HTMLFormControlsCollection {
  oldPassword: HTMLInputElement;
  newPassword: HTMLInputElement;
  repeatPassword: HTMLInputElement;
}

export interface EditPersonalDataFormElement extends HTMLFormElement {
  readonly elements: EditPersonalDataFormElements;
}

export interface EditedPersonalData {
  oldPassword: string;
  newPassword: string;
}
