import * as yup from 'yup';

export const createSpotSchema = yup.object().shape({
  spotName: yup.string().required('Please enter a spot name'),
  coordinates: yup.string().required('Please enter a spot coordinates'),
});
