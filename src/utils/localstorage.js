export function getLocalStorage(key) {
  return localStorage.getItem(key);
}

export function setLocalStorage(key, value) {
  return localStorage.setItem(key, value);
}

export function removeLocalStorage(key) {
  return localStorage.removeItem(key);
}

export const LOCAL_STORAGE_KEY = {
  ROLE: 'ROLE',
  USER_NAME: 'USER_NAME',
  PHONE_NUMBER: 'PHONE_NUMBER',
  AGENCY_ID: 'AGENCY_ID',
};
