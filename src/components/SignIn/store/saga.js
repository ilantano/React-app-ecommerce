import { call, put, takeLatest } from 'redux-saga/effects';
import { callPostApiSignIn } from '../api';

import { getSignIn } from './actions';

export function* getSignInRequest({ payload }) {
  try {
    yield put(getSignIn.request());
    const response = yield call(callPostApiSignIn, payload);
    yield put(getSignIn.success(response));
  } catch (err) {
    yield put(getSignIn.failure(err));
  } finally {
    yield put(getSignIn.fulfill());
  }
}

export default function* explainSignIn() {
  yield takeLatest(getSignIn.TRIGGER, getSignInRequest);
}
