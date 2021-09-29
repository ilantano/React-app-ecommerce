import React from 'react';
import { Table, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { convertNumberToCurrency } from '@/utils/format';

const TableComponent = ({ dataSynthetic }) => {
  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'productName',
    },
    {
      title: 'Khách giữ',
      render: (_, row) => (
        <span className='flex items-center justify-end'>
          {convertNumberToCurrency(row.customerKeeps)}
        </span>
      ),
    },
    {
      title: 'Khách kí gửi',
      render: (_, row) => (
        <span className='flex items-center justify-end'>
          {convertNumberToCurrency(row.customerConsignment)}
        </span>
      ),
    },
    {
      title: 'Thành tiền',
      render: (_, row) => (
        <span className='flex items-center justify-end'>
          {convertNumberToCurrency(row.totalMoney)}
        </span>
      ),
    },
  ];

  return (
    <>
      {dataSynthetic?.allCategory?.length === 0 ? (
        <p className='w-full mt-3 text-xl font-light'>Chưa có dữ liệu</p>
      ) : (
        <div className='w-2/3 mt-5'>
          <Table
            dataSource={dataSynthetic?.allCategory}
            columns={columns}
            pagination={false}
            scroll={{ y: 250 }}
            rowKey={(obj) => JSON.stringify(obj)}
          />
          <div className='flex justify-end'>
            <div className='text-lg mt-8 mr-2'>
              <div className='flex justify-between'>
                <span>Tổng doanh thu: </span>
                <span className='text-right ml-10'>
                  <Tooltip
                    title={`Tổng doanh thu của cửa hàng hiện tại sau khi trừ chiết khấu (${convertNumberToCurrency(
                      dataSynthetic?.discountedValue,
                    )})`}
                    placement='right'
                  >
                    <p>{convertNumberToCurrency(dataSynthetic?.totalBill)}</p>
                  </Tooltip>
                </span>
              </div>
              <p className='border-t border-black border-dashed my-1' />
              <div className='flex justify-between'>
                <span>Chuyển khoản: </span>
                <span className='text-right ml-10'>
                  <Tooltip
                    title='Tổng số tiền khách hàng chuyển khoản'
                    placement='right'
                  >
                    <p>
                      {convertNumberToCurrency(dataSynthetic?.customerPaid)}
                    </p>
                  </Tooltip>
                </span>
              </div>
              <div className='flex justify-between'>
                <span>Tiền mặt: </span>
                <span className='text-right ml-10'>
                  <Tooltip
                    title='Tiền mặt nhận từ khách hàng'
                    placement='right'
                  >
                    <p>{convertNumberToCurrency(dataSynthetic?.cash)}</p>
                  </Tooltip>
                </span>
              </div>
              <div className='flex justify-between'>
                <span>Vé trúng thưởng/vé hủy: </span>
                <span className='text-right ml-10'>
                  <Tooltip
                    title='Số tiền khách hàng thanh toán bằng vé trúng thưởng/vé huỷ'
                    placement='right'
                  >
                    <p>
                      {convertNumberToCurrency(
                        dataSynthetic?.ticketWinningValue,
                      )}
                    </p>
                  </Tooltip>
                </span>
              </div>
              <div className='flex justify-between'>
                <span>Hóa đơn trúng thưởng: </span>
                <span className='text-right ml-10'>
                  <Tooltip
                    title='Số tiền khách hàng thanh toán bằng hoá đơn trúng thưởng'
                    placement='right'
                  >
                    <p>
                      {convertNumberToCurrency(
                        dataSynthetic?.ticketDiscountValue,
                      )}
                    </p>
                  </Tooltip>
                </span>
              </div>
              <p className='border-t border-black border-dashed my-1' />
              <div className='flex justify-between'>
                <span>Hoàn trả cho khách: </span>
                <span className='text-right ml-10'>
                  <Tooltip
                    title='Số tiền đại lý hoàn trả cho khách'
                    placement='right'
                  >
                    <p>{convertNumberToCurrency(dataSynthetic?.refund)}</p>
                  </Tooltip>
                </span>
              </div>
              <div className='flex justify-between'>
                <span>Tiền mặt gửi Văn phòng: </span>
                <span className='text-right ml-10'>
                  <Tooltip
                    title='Số tiền mặt đại lý gửi lại văn phòng(đã trừ khoản hoàn trả cho khách). Nếu là số âm thì Văn phòng trả lại cho Đại lý'
                    placement='right'
                  >
                    <p>{convertNumberToCurrency(dataSynthetic?.summary)}</p>
                  </Tooltip>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TableComponent;

TableComponent.propTypes = {
  dataSynthetic: PropTypes.object.isRequired,
};
