import React from 'react';
import PropTypes from 'prop-types';

export default function SignInLayout({ children }) {
  return <>{children}</>;
}

SignInLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
