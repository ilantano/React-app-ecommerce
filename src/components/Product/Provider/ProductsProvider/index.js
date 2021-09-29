import React, { useState } from 'react';
import { setDataProductsProvider } from './helper';
import Filter from './components/Filter';
import List from './components/List';

const ProductsProviderComponent = () => {
  const [currentFilter, setCurrentFilter] = useState(
    setDataProductsProvider({}),
  );
  return (
    <>
      <Filter changeFilter={setCurrentFilter} />
      <List currentFilter={currentFilter} />
    </>
  );
};
export default ProductsProviderComponent;
