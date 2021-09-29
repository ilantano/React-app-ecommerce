import React from 'react';
import PropTypes from 'prop-types';
import PaymentComponent from '@/components/Order/Payment';

const Payment = ({ visible, dataPayment, onClose, showDrawer }) => {
  return (
    <>
      <PaymentComponent
        visible={visible}
        onClose={onClose}
        dataPayment={dataPayment}
        showDrawer={showDrawer}
      />
    </>
  );
};

export default Payment;

Payment.propTypes = {
  onClose: PropTypes.func.isRequired,
  showDrawer: PropTypes.func.isRequired,
  dataPayment: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
};
