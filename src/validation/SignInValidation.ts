import * as yup from 'yup';

export const signInSchema = yup.object().shape({
    phone: yup.number().required(),
    password: yup.string().min(6).required()
});