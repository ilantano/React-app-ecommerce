import { createReducer } from 'redux-create-reducer';
import { setLocalStorage, LOCAL_STORAGE_KEY } from '@/utils/localstorage';
import { UPDATE_AGENCY_ID, UPDATE_AGENCIES } from './settings.constant';

const initialState = {
  agencies: [],
  agencyId: null,
  collapse: false,
};

const mutations = {
  [UPDATE_AGENCY_ID]: (state, { payload }) => {
    const { agencyId } = payload;
    setLocalStorage(LOCAL_STORAGE_KEY.AGENCY_ID, agencyId);
    return {
      ...state,
      agencyId,
    };
  },
  [UPDATE_AGENCIES]: (state, { payload }) => {
    const { agencies } = payload;
    return {
      ...state,
      agencies,
    };
  },
};

export default createReducer(initialState, mutations);
