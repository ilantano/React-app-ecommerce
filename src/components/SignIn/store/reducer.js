import produce from 'immer';
import { ROUTER_ROADMAP } from '@/router/constants';
import { setToken, TOKEN_KEY } from '@/utils/cookie';
import { setLocalStorage, LOCAL_STORAGE_KEY } from '@/utils/localstorage';
import { getSignIn } from './actions';

export const initState = {
  loading: false,
  fetched: false,
  error: null,
  customer: null,
  isSignInFailed: false,
};

const signInAdmin = (state = initState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case getSignIn.REQUEST:
        draft.loading = true;
        break;
      case getSignIn.SUCCESS:
        draft.loading = false;
        draft.fetched = true;
        draft.isSignInFailed = false;
        draft.customer = payload?.data;
        // eslint-disable-next-line no-case-declarations
        const { token, username, role, phoneNumber, agencyId } = payload?.data;
        setToken(TOKEN_KEY.TOKEN, token);
        setLocalStorage(LOCAL_STORAGE_KEY.USER_NAME, username);
        setLocalStorage(LOCAL_STORAGE_KEY.ROLE, role?.[0]?.authority);
        setLocalStorage(LOCAL_STORAGE_KEY.PHONE_NUMBER, phoneNumber);
        setLocalStorage(LOCAL_STORAGE_KEY.AGENCY_ID, agencyId);
        window.location.href = ROUTER_ROADMAP.SELL.ORDER.ORDER;
        break;
      case getSignIn.FAILURE:
        draft.loading = false;
        draft.fetched = false;
        draft.error = payload;
        draft.isSignInFailed = true;
        break;
      case getSignIn.CHANGE_FORM_TRIGGER:
        draft.isSignInFailed = false;
        break;
      case getSignIn.FULFILL:
        draft.loading = false;
        break;
    }
  });

export default signInAdmin;
