import * as yup from 'yup';

export const signInSchema = yup.object().shape({
  phone: yup.number().typeError('Please enter a correct phone number').required(),
  password: yup.string().min(6, 'Password must be at least 6 characters').required(),
});

export const registrationSchema = yup.object().shape({
  email: yup.string().email().required('Please enter your email'),
  phone: yup.number().typeError('Please enter a correct phone number').required(),
  name: yup.string().required('Please enter your name'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required(),
  repeatPassword: yup.string().min(6, 'Password must be at least 6 characters').required(),
});
