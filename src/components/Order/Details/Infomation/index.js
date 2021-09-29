import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Modal, Button, message, Tooltip } from 'antd';
import ReactToPrint from 'react-to-print';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { convertNumberToCurrency, DATE_FORMAT } from '@/utils/format';
import { STATUS_PAYMENT, STATUS_TICKET } from '@/constants/listProductContants';
import HANDLE_ERROR from '@/utils/handleError';
import warningIcon from '@/assets/image/warning_icon.svg';
import completeIcon from '@/assets/image/complete_icon.svg';
import {
  PrinterOutlined,
  DollarOutlined,
  SwapOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import { callGetApiInvoiceOrder } from '../../../../pages/sales/orders/api';
import {
  callGetApiChangeTypeOrder,
  callPostApiChangeTicketStatus,
} from './api';
import InvoiceComponent from '../../../../pages/sales/orders/detail/invoice';
import {
  CHANGE_TYPE_ORDER_SUCCESS,
  WAITPRINT,
  WAITKEEP,
  WAITPAYMENT,
  OFFICE,
} from './constants';
import { getDetailsProduct } from '../DetailsStore/actions';

export const RenderPaymentStatus = ({ statusPayment, statusTicket }) => {
  if (statusPayment === 1) {
    return (
      <div
        className={`${STATUS_TICKET[statusTicket]?.textColor} bg-white rounded font-bold shadow-md px-4`}
      >
        {STATUS_TICKET[statusTicket]?.title}
      </div>
    );
  }
  if (statusTicket === 2 || statusTicket === 3) {
    return (
      <div
        className={`${STATUS_TICKET[statusTicket]?.textColor} bg-white rounded font-bold shadow-md px-4`}
      >
        {STATUS_TICKET[statusTicket]?.title}
      </div>
    );
  }
  return (
    <div
      className={`${STATUS_PAYMENT[statusPayment]?.textColor} bg-white rounded font-bold shadow-md px-4 `}
    >
      {STATUS_PAYMENT[statusPayment]?.title}
    </div>
  );
};

export const RenderProcessOrder = ({ img, css, text }) => {
  return (
    <div className='flex items-center mb-5'>
      <img src={img} alt='' />
      <span className={`ml-2 text-base ${css} font-bold`}>{text}</span>
    </div>
  );
};
function Infomation({
  infoProduct,
  showDrawerPayment,
  agencyId,
  ticketStatusId,
  setIsReloadPage,
  isReloadPage,
}) {
  const [invoiceVisible, setInvoiceVisible] = useState(false);
  const [isChangeTypeOrder, setIsChangeTypeOrder] = useState(false);
  const [dataInvoices, setDataInvoices] = useState({});
  const componentRef = useRef();
  const params = useParams();
  const ONLINE = 'online';
  const agencyIdInLocalStorage = localStorage.getItem('AGENCY_ID');

  const dispatch = useDispatch();

  const allItemTicketIsChecked = infoProduct?.orderItemResponseList?.some(
    (item) => !item?.cancelTickets && !item?.keepTicket && !item?.printed,
  );
  const isComplete = infoProduct?.paymentStatusId !== 2;

  const isDisplayBtnPrint =
    allItemTicketIsChecked === false &&
    isComplete &&
    infoProduct?.orderSource !== ONLINE;

  const isDisplayBtnChangeTypeOrder =
    ((infoProduct?.orderSource === ONLINE &&
      (infoProduct?.ticketStatusId === WAITPAYMENT ||
        infoProduct?.ticketStatusId === WAITKEEP)) ||
      (infoProduct?.orderSource !== ONLINE &&
        (infoProduct?.ticketStatusId === WAITPAYMENT ||
          infoProduct?.ticketStatusId === WAITPRINT))) &&
    infoProduct?.phoneNumber !== '';

  const handleOpenInvoice = async () => {
    try {
      setInvoiceVisible(true);
      const response = await callGetApiInvoiceOrder(params?.orderId);
      setDataInvoices(response?.data);
    } catch (error) {
      HANDLE_ERROR(error);
    }
  };

  const handleCancel = () => {
    setInvoiceVisible(false);
  };

  const changeTypeOrder = () => {
    setIsChangeTypeOrder(true);
  };

  const handleOkChangeTypeOrder = async () => {
    try {
      await callGetApiChangeTypeOrder(params?.orderId);
      setIsChangeTypeOrder(false);
      setIsReloadPage(!isReloadPage);
      message.success({
        content: CHANGE_TYPE_ORDER_SUCCESS,
        duration: 10,
      });
    } catch (error) {
      HANDLE_ERROR(error);
    }
  };

  const handleCancelChangeTypeOrder = () => {
    setIsChangeTypeOrder(false);
  };

  const handleLogPrint = async () => {
    try {
      await callPostApiChangeTicketStatus(params?.orderId);
      dispatch(getDetailsProduct.trigger(params?.orderId));
    } catch (error) {
      HANDLE_ERROR(error);
    }
  };
  return (
    <>
      <Row>
        <Col span={12}>
          <div className='flex items-end'>
            <p className='text-lg mr-3'>Đơn hàng - </p>
            <p className='text-base font-bold mr-3'>{infoProduct?.orderId}</p>
            <RenderPaymentStatus
              statusPayment={infoProduct?.paymentStatusId}
              statusTicket={infoProduct?.ticketStatusId}
            />
            {infoProduct?.orderSource === ONLINE ? (
              <p
                className='ml-4 bg-white rounded font-bold shadow-md px-4'
                style={{ color: '#673F3F' }}
              >
                Đơn trực tuyến
              </p>
            ) : (
              <p className='ml-4 bg-white rounded text-green-500 font-bold shadow-md px-4'>
                Đơn trực tiếp
              </p>
            )}
          </div>
        </Col>
        <Col span={12}>
          <div className='flex justify-end'>
            <Tooltip
              title={
                !isDisplayBtnChangeTypeOrder ? (
                  <div>
                    <p>Chỉ có thể chuyển khi:</p>
                    <ul style={{ listStyle: 'inside' }}>
                      <li>Đơn chưa xử lý xong</li>
                      <li>Đơn có số điện thoại khách hàng</li>
                    </ul>
                  </div>
                ) : infoProduct?.orderSource === ONLINE ? (
                  <p>Chuyển thành đơn trực tiếp</p>
                ) : (
                  <p>Chuyển thành đơn trực tuyến</p>
                )
              }
              className='tooltip-disable'
            >
              <button
                type='button'
                className='btn ml-5 border'
                onClick={changeTypeOrder}
                id='btnChangeType'
                disabled={!isDisplayBtnChangeTypeOrder}
              >
                <SwapOutlined className='mr-1' />
                Chuyển loại đơn
              </button>
            </Tooltip>
            <button
              type='button'
              className='btn ml-5'
              onClick={showDrawerPayment}
              id='btnPay'
            >
              <DollarOutlined className='mr-1' />
              Thanh toán
            </button>
            <Tooltip
              title={
                <div>
                  <p>Đơn hàng cẩn phải:</p>
                  <ul style={{ listStyle: 'inside' }}>
                    <li>Đã thanh toán</li>
                    <li>Đặt tại cửa hàng</li>
                    <li>Đánh dấu vé là đã in/hủy/giữ</li>
                  </ul>
                </div>
              }
              className='tooltip-disable'
            >
              <button
                type='button'
                className='btn ml-5 border'
                onClick={handleOpenInvoice}
                id='btnPrint'
                disabled={!isDisplayBtnPrint}
              >
                <PrinterOutlined className='mr-1' />
                In hóa đơn
              </button>
            </Tooltip>
          </div>
        </Col>
      </Row>
      <p className='text-base font-bold my-3'>Thông tin đơn hàng</p>
      <div>
        <Row className='mb-10'>
          <Col span={24} className='rounded-md shadow-xl p-8 bg-white'>
            <Row className='mb-4'>
              <Col span={6}>
                <p>Khách hàng</p>
                <p className='font-bold'>
                  {!infoProduct?.customerName
                    ? '--'
                    : infoProduct?.customerName}
                </p>
              </Col>
              <Col span={6}>
                <p>Thời gian tạo</p>
                <p className='font-bold'>
                  {moment(infoProduct?.createdDate).format(
                    DATE_FORMAT.DAY_MONTH_YEAR_STRIKETHROUGH,
                  )}{' '}
                  - {infoProduct?.createTime}
                </p>
              </Col>
              <Col span={6}>
                <p>SĐT người tạo</p>
                <p className='font-bold'>
                  {!infoProduct?.creatorPhoneName
                    ? '--'
                    : infoProduct?.creatorPhoneName}
                </p>
              </Col>
              <Col span={6}>
                <p>Chiết khấu</p>
                <p className='font-bold'>
                  {convertNumberToCurrency(infoProduct?.moneyDiscounted)}
                </p>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <p>Di động</p>
                <p className='font-bold'>
                  {!infoProduct?.phoneNumber ? '--' : infoProduct?.phoneNumber}
                </p>
              </Col>
              <Col span={6}>
                <p>Người tạo</p>
                <p className='font-bold'>
                  {!infoProduct?.creator ? '--' : infoProduct?.creator}
                </p>
              </Col>
              <Col span={6}>
                <p>Tổng giá trị</p>
                <p className='font-bold'>
                  {convertNumberToCurrency(infoProduct?.totalBill)}
                </p>
              </Col>
              <Col span={6}>
                <p>Đã thanh toán</p>
                <p className='font-bold'>
                  {convertNumberToCurrency(infoProduct?.moneyPaid)}
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <Modal
        title='Hóa đơn'
        visible={invoiceVisible}
        onCancel={handleCancel}
        footer={[
          <ReactToPrint
            key='printing'
            trigger={() => (
              <Button type='primary' id='btnPrinting'>
                <PrinterOutlined className='mr-1' />
                In hóa đơn
              </Button>
            )}
            content={() => componentRef.current}
            onBeforePrint={handleLogPrint}
          />,
        ]}
      >
        <InvoiceComponent
          dataInvoices={dataInvoices}
          componentRef={componentRef}
        />
      </Modal>
      <Modal
        title='Chuyển loại đơn hàng'
        visible={isChangeTypeOrder}
        onOk={handleOkChangeTypeOrder}
        onCancel={handleCancelChangeTypeOrder}
        footer={[
          <Button
            key='button'
            className='btn'
            onClick={handleOkChangeTypeOrder}
            id='btnConfirm'
          >
            Xác nhận
          </Button>,
          <Button
            key='button'
            className='btn--gray'
            onClick={handleCancelChangeTypeOrder}
            id='btnDestroy'
          >
            Hủy
          </Button>,
        ]}
      >
        <p>
          Bạn có muốn chuyển đơn hàng thành loại trực tiếp/ trực tuyến không?
        </p>
      </Modal>

      {+agencyIdInLocalStorage === +infoProduct?.agencyId &&
        ticketStatusId === WAITPRINT && (
          <RenderProcessOrder
            img={completeIcon}
            css='text-green-500'
            text='Có thể xử lý đơn này'
          />
        )}

      {+agencyIdInLocalStorage === OFFICE && ticketStatusId === WAITKEEP && (
        <RenderProcessOrder
          img={completeIcon}
          css='text-green-500'
          text='Có thể xử lý đơn này'
        />
      )}
      {+agencyIdInLocalStorage !== OFFICE && ticketStatusId === WAITKEEP && (
        <RenderProcessOrder
          img={warningIcon}
          css='text-red-500'
          text='Vui lòng chưa xử lý đơn này'
        />
      )}
      {infoProduct?.paymentStatusId === 2 && (
        <RenderProcessOrder
          img={warningIcon}
          css='text-red-500'
          text='Vui lòng chưa xử lý đơn này'
        />
      )}

      {ticketStatusId === WAITPRINT &&
        Number(agencyIdInLocalStorage) !== agencyId && (
          <RenderProcessOrder
            img={warningIcon}
            css='text-red-500'
            text='Vui lòng chưa xử lý đơn này'
          />
        )}
    </>
  );
}

export default Infomation;

Infomation.propTypes = {
  infoProduct: PropTypes.object,
  agencyId: PropTypes.number,
  orderSource: PropTypes.string,
  ticketStatusId: PropTypes.number,
  showDrawerPayment: PropTypes.func,
  setIsReloadPage: PropTypes.func,
  isReloadPage: PropTypes.bool,
};
Infomation.defaultProps = {
  infoProduct: {},
  agencyId: 0,
  orderSource: '',
  ticketStatusId: 0,
  isReloadPage: false,
  showDrawerPayment: () => {},
  setIsReloadPage: () => {},
};
RenderPaymentStatus.propTypes = {
  statusPayment: PropTypes.number,
  statusTicket: PropTypes.number,
};
RenderProcessOrder.propTypes = {
  img: PropTypes.string,
  css: PropTypes.string,
  text: PropTypes.string,
};
RenderPaymentStatus.defaultProps = {
  statusPayment: 0,
  statusTicket: 0,
};
RenderProcessOrder.defaultProps = {
  img: '',
  css: '',
  text: '',
};
