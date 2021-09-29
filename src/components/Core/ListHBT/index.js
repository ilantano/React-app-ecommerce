/*
Author: Nguyễn Giang Nam (namng@hivetech.vn)
Description: Danh sách sử dụng chung trong cả dự án đã bao gồm kết nối API và phân trang
Version: 1.0
Created: 10h 18p 07/07/2021
*/
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination } from 'antd';
import HANDLE_ERROR from '../../../utils/handleError';

const SORT_TYPE = {
  ASCEND: 'ascend',
  ASC: 'ASC',
  DESC: 'DESC',
};

const SORT_BY = {
  TOTAL_AMOUNT: 'totalAmount',
};

export default function ListHBT({
  columns,
  currentFilter,
  runApi,
  setDataGetList,
  dataFilter,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState({ resource: [], total: 0 });
  const [filter, setFilter] = useState({ pageNo: 1, pageSize: 10 });
  const [dataSorter, setDataSorter] = useState();
  useEffect(() => {
    setFilter(currentFilter);
    getDataList(currentFilter);
  }, [currentFilter]);

  const getDataList = async (value) => {
    try {
      setIsLoading(true);
      const results = await runApi(value);
      setList(results?.data);
    } catch (error) {
      HANDLE_ERROR(error);
    } finally {
      setFilter(value);
      setIsLoading(false);
    }
  };

  const sortOrder = (sorter) => {
    getDataList({ ...currentFilter, ...filter, ...sorter });
  };

  function onChangeSorter(_pagination, _filters, sorter) {
    sortOrder({
      columnName: sorter?.field,
      sortValueOrder:
        sorter?.field === SORT_BY.TOTAL_AMOUNT
          ? sorter?.order === SORT_TYPE.ASCEND
            ? SORT_TYPE.ASC
            : SORT_TYPE.DESC
          : '',
      sortType:
        sorter?.order === SORT_TYPE.ASCEND ? SORT_TYPE.ASC : SORT_TYPE.DESC,
    });
    setDataSorter({
      columnName: sorter?.field,
      sortValueOrder:
        sorter?.field === SORT_BY.TOTAL_AMOUNT
          ? sorter?.order === SORT_TYPE.ASCEND
            ? SORT_TYPE.ASC
            : SORT_TYPE.DESC
          : '',
      sortType:
        sorter?.order === SORT_TYPE.ASCEND ? SORT_TYPE.ASC : SORT_TYPE.DESC,
    });
  }

  const onChange = (page, size) => {
    const newPagingParams = {
      pageNo: page,
      pageSize: size,
    };
    const data = setDataGetList({
      ...dataSorter,
      ...dataFilter,
      ...newPagingParams,
    });
    setFilter(data);
    getDataList({ ...data });
  };

  return (
    <>
      <Table
        locale={{ emptyText: 'Không có dữ liệu' }}
        loading={isLoading}
        columns={columns}
        dataSource={list.resource}
        size='small'
        pagination={false}
        scroll={{ x: 1000 }}
        onChange={onChangeSorter}
        rowKey={(obj) => JSON.stringify(obj)}
      />
      <Pagination
        total={list.total || 1}
        pageSize={filter?.pageSize}
        current={filter?.pageNo}
        showSizeChanger
        pageSizeOptions={[10, 20, 30, 50]}
        onChange={onChange}
        className='flex justify-end mt-5'
      />
    </>
  );
}

ListHBT.propTypes = {
  currentFilter: PropTypes.object.isRequired,
  setDataGetList: PropTypes.func.isRequired,
  dataFilter: PropTypes.object,
  columns: PropTypes.array.isRequired,
  runApi: PropTypes.func.isRequired,
};
ListHBT.defaultProps = {
  dataFilter: {},
};
