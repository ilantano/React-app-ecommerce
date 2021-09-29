import { getToken, TOKEN_KEY } from './cookie';

const HEADER = {
  headers: {
    Authorization: getToken(TOKEN_KEY.TOKEN)
      ? `Bearer ${getToken(TOKEN_KEY.TOKEN)}`
      : undefined,
    'Content-Type': 'application/json; charset=UTF-8',
    search: '',
  },
};

export default HEADER;
