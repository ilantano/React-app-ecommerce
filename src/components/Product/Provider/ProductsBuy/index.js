import React, { useState } from 'react';
import Filter from './components/Filter';
import List from './components/List';
import { setDataProductsBuy } from './helper';

const ProductsBuyComponent = () => {
  const [currentFilter, setCurrentFilter] = useState(setDataProductsBuy({}));

  return (
    <>
      <Filter changeFilter={setCurrentFilter} />
      <List currentFilter={currentFilter} />
    </>
  );
};
export default ProductsBuyComponent;
