import React from 'react';
import PropTypes from 'prop-types';
import Filter from './components/Filter';
import TableComponent from './components/Table';

const SyntheticComponent = ({ dataSynthetic, getDataSynthetic }) => {
  return (
    <>
      <Filter getDataSynthetic={getDataSynthetic} />
      <TableComponent dataSynthetic={dataSynthetic} />
    </>
  );
};

export default SyntheticComponent;

SyntheticComponent.propTypes = {
  dataSynthetic: PropTypes.object.isRequired,
  getDataSynthetic: PropTypes.func.isRequired,
};
