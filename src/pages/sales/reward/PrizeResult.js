import React, { useState } from 'react';
import { setDataPrizeResult } from '../../../components/Order/Reward/PrizeResult/helper';
import FilterReward from '../../../components/Order/Reward/PrizeResult/Filter';
import ListPrizeResult from '../../../components/Order/Reward/PrizeResult/List';

export default function PrizeResult() {
  const [currentFilter, setCurrentFilter] = useState(setDataPrizeResult({}));

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', width: '100%' }}>
          <FilterReward changeFilter={setCurrentFilter} />
        </div>
        <div style={{ margin: 15 }}>
          <button type='button' className='btn' id='btnAddResult'>
            Thêm kết quả
          </button>
        </div>
      </div>
      <ListPrizeResult currentFilter={currentFilter} />
    </div>
  );
}
