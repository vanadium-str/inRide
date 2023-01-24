import * as yup from 'yup';

export const createEventSchema = yup.object().shape({
  date: yup.string().required('Please enter an event date'),
  timeStart: yup.string().required('Please enter an event time start'),
  timeEnd: yup.string().required('Please enter an event time end'),
  price: yup
    .number()
    .required()
    .typeError('Please enter a price'),
  minPlaces: yup
    .number()
    .min(1, 'A number of seats must be greater than 0')
    .required()
    .typeError('Please enter a number of seats'),
  maxPlaces: yup
    .number()
    .min(1, 'A number of seats must be greater than 0')
    .required()
    .typeError('Please enter a number of seats'),
});
