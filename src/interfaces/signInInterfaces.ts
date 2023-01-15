interface SignInFormElements extends HTMLFormControlsCollection {
  phone: HTMLInputElement;
  password: HTMLInputElement;
}

export interface SignInFormElement extends HTMLFormElement {
  readonly elements: SignInFormElements;
}

interface RegistrationFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  name: HTMLInputElement;
  phone: HTMLInputElement;
  password: HTMLInputElement;
  repeatPassword: HTMLInputElement;
}

export interface RegistrationFormElement extends HTMLFormElement {
  readonly elements: RegistrationFormElements;
}

export interface RegistrationData {
  email: string;
  name: string;
  phone: number;
  password: string;
}
