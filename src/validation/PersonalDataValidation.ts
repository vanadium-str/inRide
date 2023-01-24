import * as yup from 'yup';

export const editPersonalDataSchema = yup.object().shape({
  oldPassword: yup.string().min(6, 'Password must be at least 6 characters').required(),
  newPassword: yup.string().min(6, 'Password must be at least 6 characters').required(),
  repeatPassword: yup.string().min(6, 'Password must be at least 6 characters').required(),
});
