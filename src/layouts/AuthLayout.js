import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { getToken, TOKEN_KEY } from '../utils/cookie';

export default function AuthLayout({ children = {} }) {
  const token = getToken(TOKEN_KEY.TOKEN);

  const history = useHistory();
  if (!token) {
    history.push('/dang-nhap');
  }

  return (
    <>
      <div className='bg-gray'>{children}</div>
    </>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.string.isRequired,
};
