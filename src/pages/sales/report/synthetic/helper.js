import moment from 'moment';
import { getLocalStorage, LOCAL_STORAGE_KEY } from '@/utils/localstorage';

export const setDataGetListSynthetic = (data) => ({
  agencyId: data?.agencyId || getLocalStorage(LOCAL_STORAGE_KEY.AGENCY_ID),
  date: data?.date || moment().format('L'),
});
