import {
  UPDATE_AGENCY_ID,
  UPDATE_COLLAPSE,
  UPDATE_AGENCIES,
} from './settings.constant';

export const updateAgencyId = (agencyId) => ({
  type: UPDATE_AGENCY_ID,
  payload: {
    agencyId,
  },
});

export const updateCollapse = (payload) => ({
  type: UPDATE_COLLAPSE,
  payload,
});

export const updateAgencies = (agencies) => ({
  type: UPDATE_AGENCIES,
  payload: {
    agencies,
  },
});
