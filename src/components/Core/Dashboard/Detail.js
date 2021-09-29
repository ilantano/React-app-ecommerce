import { Modal, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import { DATE_FORMAT } from '@/utils/format';
import MESSAGE from '@/constants/message';
import { callApiGetCustomerDetail } from '../../../api/dashBoard';

export default function CustomerDetail({ handleCancel, visible, customerId }) {
  const [customerDetail, setCustomerDetail] = useState({});

  const questionOfCustomer = (questionList) => {
    const itemQuestion = questionList.map((question) => (
      <div key={question} className='weight-700'>{`- ${question}`}</div>
    ));
    return itemQuestion;
  };

  const getCustomerDetail = async (customerID) => {
    const results = await callApiGetCustomerDetail(customerID);
    if (get(results, 'status' !== 200)) {
      return message.error(MESSAGE.GET_DETAIL_CUSTOMER_FAILED);
    }
    setCustomerDetail(get(results, 'data', {}));
    return null;
  };

  useEffect(() => {
    getCustomerDetail(customerId);
  }, [customerId]);

  const strengthFigure = (objectNumber = {}) => {
    const gridItem = (index) => (
      // check the number power repetitions =>
      <span>
        {`${objectNumber[index] ? `${index}` : 'N/A'}`}
        {parseInt(objectNumber[index], 10) > 1 && (
          <span className='number-pow'>{objectNumber[index]}</span>
        )}
      </span>
    );

    return (
      <>
        <div className='grid-item weight-700 bd-b-none'>{gridItem(3)}</div>
        <div className='grid-item weight-700 bd-b-none bd-l-r-none'>
          {gridItem(6)}
        </div>
        <div className='grid-item weight-700 bd-b-none'>{gridItem(9)}</div>
        <div className='grid-item weight-700'>{gridItem(2)}</div>
        <div className='grid-item weight-700 bd-l-r-none'>{gridItem(5)}</div>
        <div className='grid-item weight-700'>{gridItem(8)}</div>
        <div className='grid-item weight-700 bd-t-none'>{gridItem(1)}</div>
        <div className='grid-item weight-700 bd-l-r-none bd-t-none'>
          {gridItem(4)}
        </div>
        <div className='grid-item weight-700 bd-t-none'>{gridItem(7)}</div>
      </>
    );
  };
  return (
    <Modal
      title='Chi tiết'
      visible={visible}
      footer={null}
      onCancel={handleCancel}
      bodyStyle={{ padding: '0' }}
      style={{ width: '559px' }}
    >
      <>
        <div className='customer'>
          <div className='customer__info'>
            <div className='customer__info--left'>
              <div>
                <span>Họ và Tên:</span>
                <span className='weight-700'>{` ${get(
                  customerDetail,
                  'fullName',
                  '',
                )}`}</span>
              </div>
              <div>
                <span>Ngày, giờ sinh:</span>
                <span className='weight-700'>{` ${
                  get(customerDetail, 'birthday')
                    ? moment(get(customerDetail, 'birthday')).format(
                        DATE_FORMAT.DAY_MONTH_YEAR,
                      )
                    : ''
                } - ${get(customerDetail, 'birthHour')}`}</span>
              </div>
            </div>
            <div className='customer__info--right'>
              <div>
                <span>Email:</span>
                <span className='weight-700'>{` ${get(
                  customerDetail,
                  'email',
                )}`}</span>
              </div>
              <div>
                <span>Điện thoại:</span>
                <span className='weight-700'>{` ${get(
                  customerDetail,
                  'mobile',
                  '',
                )}`}</span>
              </div>
            </div>
          </div>
          <span>Câu hỏi quan tâm:</span>
          <div className='customer__question'>
            <div
              className={`customer__grid-container-question${
                get(customerDetail, 'questions', []).length === 1
                  ? '--one-question'
                  : ''
              }`}
            >
              {questionOfCustomer(get(customerDetail, 'questions', []))}
            </div>
          </div>
        </div>
        <div className='customer__vitality'>
          <div className='customer__vitality--primary'>
            <div className='vitality-table__primary'>
              <div className='vitality-table__primary--title'>Sức mạnh gốc</div>
              <div className='grid-container'>
                {strengthFigure(get(customerDetail, 'rootPower'))}
              </div>
            </div>
          </div>
          <div className='customer__vitality--life-power'>
            <div className='vitality-table__life-power--title'>
              Sức mạnh cuộc đời
            </div>
            <div className='grid-container'>
              {strengthFigure(get(customerDetail, 'lifePower'))}
            </div>
          </div>
        </div>
      </>
    </Modal>
  );
}

CustomerDetail.propTypes = {
  handleCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  customerId: PropTypes.number.isRequired,
};
