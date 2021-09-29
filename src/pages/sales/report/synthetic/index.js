import React, { useState, useEffect } from 'react';
import SyntheticComponent from '@/components/Order/Report/Synthetic';
import HANDLE_ERROR from '@/utils/handleError';
import { callGetApiISummaryReport } from './api';
import { setDataGetListSynthetic } from './helper';

export default function Synthetic() {
  const [dataSynthetic, setDataSynthetic] = useState({});

  const getDataSynthetic = async (params) => {
    try {
      const convertParams = setDataGetListSynthetic(params);
      const result = await callGetApiISummaryReport(convertParams);
      setDataSynthetic(result?.data);
    } catch (error) {
      HANDLE_ERROR(error);
    }
  };

  useEffect(() => {
    getDataSynthetic();
  }, []);

  return (
    <>
      <SyntheticComponent
        getDataSynthetic={getDataSynthetic}
        dataSynthetic={dataSynthetic}
      />
    </>
  );
}
