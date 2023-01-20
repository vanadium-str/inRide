import * as yup from "yup";

export const editPersonalDataSchema = yup.object().shape({
    oldPassword: yup.string().min(6).required(),
    newPassword: yup.string().min(6).required(),
    repeatPassword: yup.string().min(6).required(),
})