import React from 'react';
import SignInComponent from '@/components/SignIn';
import { useInjectSaga } from '@/utils/inject-saga';
import saga from '@/components/SignIn/store/saga';

import { getToken, TOKEN_KEY } from '@/utils/cookie';
import { ROUTER_ROADMAP } from '@/router/constants';
import { useHistory } from 'react-router-dom';

const SignIn = () => {
  useInjectSaga({ key: 'user', saga });
  const token = getToken(TOKEN_KEY.TOKEN);
  const history = useHistory();

  return (
    <>
      {token ? (
        history.push(ROUTER_ROADMAP.SELL.ORDER.ORDER)
      ) : (
        <SignInComponent />
      )}
    </>
  );
};

export default SignIn;
