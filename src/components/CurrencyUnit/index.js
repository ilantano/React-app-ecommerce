import React from 'react';
import PropTypes from 'prop-types';

function CurrencyUnit({ value, unit, className, onClick }) {
  return (
    <button type='button' className={className} onClick={onClick}>
      <span>{parseFloat(value?.toFixed(2))}</span>
      <span>{unit}</span>
    </button>
  );
}

export default CurrencyUnit;

CurrencyUnit.propTypes = {
  value: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
