import * as yup from "yup";

export const signInSchema = yup.object().shape({
  phone: yup.number().required(),
  password: yup.string().min(6).required(),
});

export const registrationSchema = yup.object().shape({
  email: yup.string().email().required(),
  phone: yup.number().required(),
  name: yup.string().required(),
  password: yup.string().min(6).required(),
  repeatPassword: yup.string().min(6).required(),
});
