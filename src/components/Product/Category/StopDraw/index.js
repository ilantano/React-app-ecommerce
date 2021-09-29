import React, { useState } from 'react';
import Filter from './components/Filter';
import List from './components/List';
import { setDataCategoryStopDraw } from './helper';

const StopDrawComponent = () => {
  const [currentFilter, setCurrentFilter] = useState(
    setDataCategoryStopDraw({}),
  );
  return (
    <>
      <Filter changeFilter={setCurrentFilter} />
      <List currentFilter={currentFilter} />
    </>
  );
};
export default StopDrawComponent;
