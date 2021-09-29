import produce from 'immer';

import { getDetailsProduct } from './actions';

export const initState = {
  loading: false,
  fetched: false,
  error: null,
  details: null,
};

const detailsReducer = (state = initState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case getDetailsProduct.REQUEST:
        draft.loading = true;
        break;
      case getDetailsProduct.SUCCESS:
        draft.loading = false;
        draft.fetched = true;
        draft.details = payload;
        break;
      case getDetailsProduct.DELETE:
        draft.loading = false;
        draft.fetched = true;
        draft.details?.orderItemResponseList.splice(Number(payload), 1);
        break;
      case getDetailsProduct.UPDATE:
        draft.loading = false;
        draft.fetched = true;
        // eslint-disable-next-line array-callback-return
        draft.details?.orderItemResponseList.map((item) => {
          if (item.orderItemId === payload?.param) {
            item.keepTicket = payload?.data?.keepTicket;
            item.printed = payload?.data?.printed;
            item.cancelTickets = payload?.data?.cancelTickets;
          }
        });
        break;
      case getDetailsProduct.FAILURE:
        draft.loading = false;
        draft.fetched = false;
        draft.error = payload;
        break;
    }
  });

export default detailsReducer;
