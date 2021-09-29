import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Tooltip } from 'antd';
import { ROUTER_ROADMAP } from '@/router/constants';
import Info from '@/assets/image/info.svg';
import { convertNumberToCurrency } from '@/utils/format';
import { STATUS_TICKET, STATUS_PAYMENT } from '@/constants/listProductContants';
import ListHBT from '../../Core/ListHBT';
import { callApiGetListOrder } from '../../../api/managerOrder';
import { setDataGetListProducts } from '../helper';

function ListOrders({ currentFilter, dataFilter }) {
  const history = useHistory();
  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      className: 'font-bold',
      align: 'left',
      width: '100px',
      render: (_, item, index) => index + 1,
    },
    {
      title: 'Mã đơn hàng',
      dataIndex: 'orderId',
      key: 'orderId',
      className: 'font-black clear-css',
      width: '220px',
      sorter: true,
    },
    {
      title: 'Giá trị',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      width: '220px',
      sorter: true,
      render: (_, row) => (
        <div className='flex justify-end font-bold'>
          {convertNumberToCurrency(row?.totalAmount)}
        </div>
      ),
    },
    {
      title: 'Thanh toán',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      className: 'font-bold',
      width: '300px',
      render: (_, row) => (
        <span className={STATUS_PAYMENT[row?.paymentStatusId]?.textColor}>
          {STATUS_PAYMENT[row?.paymentStatusId]?.title}
        </span>
      ),
    },
    {
      title: 'Trạng thái vé',
      dataIndex: 'ticketStatus',
      key: 'ticketStatus',
      className: 'font-bold',
      width: '300px',
      render: (_, row) => (
        <span className={STATUS_TICKET[row?.ticketStatusId]?.textColor}>
          {STATUS_TICKET[row?.ticketStatusId]?.title}
        </span>
      ),
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customerName',
      key: 'customerName',
      sorter: true,
      className: 'font-bold',
      width: '300px',
      render: (_, row) => (
        <div>{!row?.customerName ? '--' : row?.customerName}</div>
      ),
    },
    {
      title: 'SĐT',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      sorter: true,
      className: 'font-bold',
      width: '300px',
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'createdDate',
      key: 'createdDate',
      defaultSortOrder: 'ascend',
      sorter: true,
      className: 'font-bold',
      width: '300px',
      render: (_, row) => (
        <div>
          {row?.createdDate} - {row?.createdTime}{' '}
        </div>
      ),
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      className: 'font-bold',
      width: '5%',
      render: (_, row) => (
        <Tooltip title='Chi tiết' color='blue'>
          <div className='flex justify-center'>
            <div
              aria-hidden='true'
              className='mr-2 cursor-pointer'
              onClick={() =>
                history.push(
                  `${ROUTER_ROADMAP.SELL.ORDER.LIST.DETAILS}/${row?.orderId}`,
                )
              }
            >
              <img src={Info} alt='chi-tiet' />
            </div>
          </div>
        </Tooltip>
      ),
    },
  ];

  const runApi = async (value) => {
    const results = await callApiGetListOrder(value);
    return results;
  };

  return (
    <div>
      <ListHBT
        columns={columns}
        currentFilter={currentFilter}
        dataFilter={dataFilter}
        runApi={runApi}
        setDataGetList={setDataGetListProducts}
      />
    </div>
  );
}

export default ListOrders;
ListOrders.propTypes = {
  currentFilter: PropTypes.object.isRequired,
  dataFilter: PropTypes.object,
};
ListOrders.defaultProps = {
  dataFilter: {},
};
