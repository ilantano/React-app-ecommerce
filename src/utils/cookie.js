import Cookies from 'js-cookie';

export function getToken(key) {
  return Cookies.get(key);
}

export function setToken(key, value) {
  return Cookies.set(key, value);
}

export function removeToken(key) {
  return Cookies.remove(key);
}

export const TOKEN_KEY = {
  TOKEN: 'TOKEN',
  USER_NAME: 'USERNAME',
  PROVIDER_ID_KEY: 'PROVIDER_ID',
  ROLE: 'ROLE',
};
