import React, { useState } from 'react';
import HANDLE_ERROR from '@/utils/handleError';
import { setDataGetListProducts } from '../../../components/Order/helper';
import FilterOrder from '../../../components/Order/Filter';
import DataTable from '../../../components/Order/List';
import { callGetLinkCreateOrder } from './api';

export default function Order() {
  const [currentFilter, setCurrentFilter] = useState(
    setDataGetListProducts({}),
  );
  const [dataFilter, setDataFilter] = useState();

  const getLinkCreateOrder = async () => {
    try {
      const link = await callGetLinkCreateOrder();
      window.open(link?.data, '_blank');
    } catch (error) {
      HANDLE_ERROR(error);
    }
  };

  const getChildData = (childData) => {
    setDataFilter(childData);
  };

  return (
    <div>
      <FilterOrder
        getChildData={getChildData}
        changeFilter={setCurrentFilter}
      />
      <button
        type='button'
        className='btn mb-5'
        onClick={getLinkCreateOrder}
        id='btnCreate'
      >
        Tạo đơn hàng
      </button>
      <DataTable dataFilter={dataFilter} currentFilter={currentFilter} />
    </div>
  );
}
