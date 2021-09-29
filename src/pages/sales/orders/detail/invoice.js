import React from 'react';
import PropTypes from 'prop-types';
import { convertNumberToCurrency } from '@/utils/format';
import { PRODUCT_NAME } from '@/utils/constants';
import { getLocalStorage, LOCAL_STORAGE_KEY } from '@/utils/localstorage';
import { DEFAULT_INFO } from './constants';

const InvoiceComponent = ({ dataInvoices, componentRef }) => {
  const printer = getLocalStorage(LOCAL_STORAGE_KEY.USER_NAME);

  const convertString = (value) => {
    if (value.trim().substr(value.trim().length - 1) === '*') {
      return value.trim().substring(0, value.trim().length - 1);
    }
    return value;
  };

  return (
    <div ref={componentRef} className='text-10px px-3 font-roboto font-normal'>
      <div className='text-center'>
        <p className='text-xl font-bold'>HN13</p>
        <p>{dataInvoices?.nameAgency}</p>
        <p>
          Điện thoại:{' '}
          {dataInvoices?.phoneNumberCustomerCare || DEFAULT_INFO.phoneNumber}
        </p>
        <p>{DEFAULT_INFO.location}</p>
      </div>
      <p className='mx-20 my-4 border-t border-black border-dotted' />
      <div>
        <p className='text-lg font-bold text-center'>HÓA ĐƠN</p>
        <p>Mã hóa đơn: {dataInvoices?.orderId}</p>
        <p>Thời gian in: {dataInvoices?.printTime}</p>
        <p>
          Khách hàng:{' '}
          {dataInvoices?.nameCustomer ? (
            <span>{dataInvoices?.nameCustomer}</span>
          ) : (
            <span>--</span>
          )}
        </p>
        <p>Điện thoại khách hàng: {dataInvoices?.phoneNumberCustomer}</p>
        <p>Người in: {printer}</p>
      </div>
      {dataInvoices?.customerKeeps?.length !== 0 && (
        <div>
          <p className='my-4 border-t border-black border-dotted' />
          <p className='text-lg font-bold text-center'>KHÁCH GIỮ</p>
          <table className='w-full'>
            <tr className='w-full text-10px'>
              <th className='text-left '>Sản phẩm</th>
              <th>Số lượng</th>
              <th className='text-right '>Thành tiền</th>
            </tr>
            {dataInvoices?.customerKeeps?.map((customer) => (
              <tr className='font-light text-10px' key={customer?.product}>
                <td>{customer?.product}</td>
                <td className='text-center'>{customer?.quantity}</td>
                <td className='text-right'>
                  {convertNumberToCurrency(customer?.totalMoney)}
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
      {dataInvoices?.agencyKeeps?.length !== 0 && (
        <div className='mt-4 pt-4 border-t border-black border-dotted'>
          <p className='text-lg font-bold text-center'>KHÁCH GỬI</p>
          {dataInvoices?.agencyKeeps?.map((agency, keys) => (
            <div key={agency?.categoryName}>
              <p
                className={
                  keys === 0
                    ? 'pt-1 text-xs font-bold'
                    : 'border-t border-black border-dotted pt-1 text-xs font-bold'
                }
              >
                {agency?.categoryName}
              </p>
              {agency?.categoryItems?.map((subProduct, index) => (
                <div
                  key={subProduct?.seri}
                  className={
                    index === agency?.categoryItems?.length - 1
                      ? 'pt-2 pb-2'
                      : 'border-b border-black border-dotted pt-2 pb-2'
                  }
                >
                  <p className='flex justify-between'>
                    {subProduct?.category === PRODUCT_NAME.VIETLOTT ? (
                      <span className='font-bold w-5/12'>
                        {subProduct?.productName} - {subProduct?.playStyle}
                      </span>
                    ) : (
                      <span className='font-bold'>{subProduct?.playStyle}</span>
                    )}
                    <div className='w-7/12 flex justify-between'>
                      <span>
                        {convertNumberToCurrency(subProduct?.defaultPrice)}
                      </span>
                      <span>
                        {convertNumberToCurrency(subProduct?.totalMoney)}
                      </span>
                    </div>
                  </p>
                  <p className='pt-1'>{subProduct?.numberValue}</p>
                  {subProduct?.discountTypeName ? (
                    <p className='pt-1'>
                      Chiết khấu: {subProduct?.discountTypeName}
                    </p>
                  ) : null}
                  <div className='flex'>
                    <p className='w-5/12'>Kỳ dự thưởng</p>
                    <div className='w-7/12'>
                      {subProduct?.periods?.map((item) => (
                        <div key={item.id}>
                          {item?.name ? (
                            <span>
                              {item?.name} - {convertString(item?.periodDate)}
                            </span>
                          ) : (
                            <span>{convertString(item?.periodDate)}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      <div className='pt-4 border-t border-black border-dotted mb-10 flex justify-end'>
        <div />
        <div>
          <div className='flex justify-between'>
            <div className='text-left'>
              <p>Tổng cộng</p>
              <p>Chiết khấu</p>
              <p>Đã thu</p>
              <p>Trả lại</p>
              <p>Thành tiền</p>
            </div>
            <div className='text-right ml-10'>
              <p>{convertNumberToCurrency(dataInvoices?.totalBill)}</p>
              <p>{convertNumberToCurrency(dataInvoices?.discountMoney)}</p>
              <p>{convertNumberToCurrency(dataInvoices?.moneyPaid)}</p>
              <p>{convertNumberToCurrency(dataInvoices?.refund)}</p>
              <p>{convertNumberToCurrency(dataInvoices?.intoMoney)}</p>
            </div>
          </div>
          <div className='border-black border-dotted border-b my-1' />
          <p>Hình thức thanh toán</p>
          <div className='flex justify-between'>
            <div className='text-left'>
              <p>Vé trúng thưởng/vé hủy</p>
              <p>Chuyển khoản</p>
              <p>Hóa đơn trúng thưởng</p>
              <p>Tiền mặt</p>
            </div>
            <div className='text-right ml-10'>
              <p>{convertNumberToCurrency(dataInvoices?.deductionInvoice)}</p>
              <p>{convertNumberToCurrency(dataInvoices?.paid)}</p>
              <p>{convertNumberToCurrency(dataInvoices?.awardTicket)}</p>
              <p>{convertNumberToCurrency(dataInvoices?.directCash)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceComponent;

InvoiceComponent.propTypes = {
  componentRef: PropTypes.object.isRequired,
  dataInvoices: PropTypes.object.isRequired,
};
