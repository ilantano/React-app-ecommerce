import { createRoutineCreator } from 'redux-saga-routines';

import { GET_SIGN_IN } from './constants';

const createProductRoutine = createRoutineCreator([
  'TRIGGER',
  'SUCCESS',
  'REQUEST',
  'FAILURE',
  'FULFILL',
  'CHANGE_FORM_TRIGGER',
]);

export const getSignIn = createProductRoutine(GET_SIGN_IN);
