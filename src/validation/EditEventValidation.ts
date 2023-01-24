import * as yup from 'yup';

export const editEventSchema = yup.object().shape({
  timeStartEdit: yup.string().required('Please enter an event time start'),
  timeEndEdit: yup.string().required('Please enter an event time end'),
});
