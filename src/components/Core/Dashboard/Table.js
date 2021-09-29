import { Table } from 'antd';
import React, { useState } from 'react';
import { get } from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import { DATE_FORMAT } from '@/utils/format';
import CustomerDetail from './Detail';

export default function DashBoardTable({
  dashBoardInformation,
  handleChangePaging,
  pageNo,
  total,
  pageSize,
  id,
}) {
  const [customerIdDetail, setCustomerIdDetail] = useState(id);
  const getCustomerDetail = (customerId) => {
    setCustomerIdDetail(customerId);
  };
  const columns = [
    {
      title: 'TT',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      render: (item, row, index) => <span>{index + 1}</span>,
    },
    {
      title: 'Họ và Tên',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'birthday',
      key: 'birthday',
      align: 'center',
      render: (birthday) => (
        <span>{moment(birthday).format(DATE_FORMAT.DAY_MONTH_YEAR)}</span>
      ),
    },
    {
      title: 'Giờ sinh',
      dataIndex: 'birthHour',
      key: 'birthHour',
      align: 'center',
    },
    {
      title: 'Đường đời',
      dataIndex: 'lifePathNumber',
      key: 'lifePathNumber',
      align: 'center',
    },
    {
      title: 'Sứ mệnh',
      dataIndex: 'expressionsNumber',
      key: 'expressionsNumber',
      align: 'center',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'birthdayNumber',
      key: 'birthdayNumber',
      align: 'center',
    },
    {
      title: 'Đam mê',
      dataIndex: 'heartDesireNumber',
      key: 'heartDesireNumber',
      align: 'center',
    },
    {
      title: 'Ngoại cách',
      dataIndex: 'personalityNumber',
      key: 'personalityNumber',
      align: 'center',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (row) => (
        <button
          type='button'
          id='btnAction'
          className='btn-detail'
          onClick={() => getCustomerDetail(get(row, 'customerId'))}
        >
          chi tiết
        </button>
      ),
    },
  ];

  const handleChange = (event) => {
    handleChangePaging({ pageNo: event?.current, pageSize: event?.pageSize });
  };

  return (
    <>
      <Table
        locale={{ emptyText: 'Không có dữ liệu' }}
        dataSource={dashBoardInformation}
        columns={columns}
        rowKey='index'
        rowClassName={(record, index) => (index % 2 !== 0 ? 'row--blue' : '')}
        pagination={{
          position: ['bottomCenter'],
          showQuickJumper: true,
          showSizeChanger: true,
          total,
          current: pageNo,
          pageSize,
        }}
        onChange={handleChange}
      />
      {customerIdDetail && (
        <CustomerDetail
          visible={customerIdDetail}
          customerId={customerIdDetail}
          handleCancel={() => setCustomerIdDetail(null)}
        />
      )}
    </>
  );
}

DashBoardTable.propTypes = {
  dashBoardInformation: PropTypes.any.isRequired,
  handleChangePaging: PropTypes.func.isRequired,
  pageNo: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};
