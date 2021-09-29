import { combineReducers } from 'redux';
import userReducer from '@/components/SignIn/store/reducer';
import globalReducer from '../store/global/reducer';

export default function createReducer(asyncReducers) {
  return combineReducers({
    global: globalReducer,
    user: userReducer,
    ...asyncReducers,
  });
}
