import { createRoutineCreator } from 'redux-saga-routines';

import { GET_DETAILS_PRODUCT } from './constant';

const createDetailsRoutine = createRoutineCreator([
  'TRIGGER',
  'SUCCESS',
  'REQUEST',
  'FAILURE',
  'FULFILL',
  'UPDATE',
  'DELETE',
]);

export const getDetailsProduct = createDetailsRoutine(GET_DETAILS_PRODUCT);
