import { call, put, takeLatest } from 'redux-saga/effects';
import { callApiGetDetailOrder } from './api';
import { getDetailsProduct } from './actions';

export function* getDetailsRequest({ payload }) {
  try {
    yield put(getDetailsProduct.request(payload));
    const response = yield call(callApiGetDetailOrder, payload);
    yield put(getDetailsProduct.success(response?.data));
  } catch (err) {
    yield put(getDetailsProduct.failure(err));
  } finally {
    yield put(getDetailsProduct.fulfill());
  }
}

export default function* storeList() {
  yield takeLatest(getDetailsProduct.TRIGGER, getDetailsRequest);
}
