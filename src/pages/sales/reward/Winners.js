import React, { useState } from 'react';
import FilterWinners from '../../../components/Order/Reward/Winners/Filter';
import { setDataWinners } from '../../../components/Order/Reward/Winners/helper';
import ListWinners from '../../../components/Order/Reward/Winners/List';

export default function Winners() {
  const [currentFilter, setCurrentFilter] = useState(setDataWinners({}));

  return (
    <div>
      <FilterWinners changeFilter={setCurrentFilter} />
      <ListWinners currentFilter={currentFilter} />
    </div>
  );
}
