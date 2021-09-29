import React, { useEffect } from 'react';
import { Form, DatePicker, Drawer, Button } from 'antd';
import PropTypes from 'prop-types';
import MultipleSelect from '../../../../Core/Filter/MultipleSelect';

const ActionComponent = ({
  title,
  visible,
  handleCancel,
  titleButton,
  dataRepair,
  isUpdate,
}) => {
  const [form] = Form.useForm();
  const handleOnFinish = () => {
    handleCancel();
  };

  useEffect(() => {
    if (isUpdate === 0) {
      form.setFieldsValue({
        endDate: dataRepair?.endDate || '',
        startDate: dataRepair?.startDate || '',
        product: dataRepair?.product || '',
      });
    }
  }, []);

  return (
    <>
      <Drawer
        width={520}
        title={title}
        placement='right'
        onClose={handleCancel}
        visible={visible}
      >
        <Form layout='vertical' form={form} onFinish={handleOnFinish}>
          <Form.Item name='endDate' label='Ngừng mở thưởng'>
            <DatePicker className='w-full' />
          </Form.Item>
          <Form.Item name='startDate' label='Bắt đầu mở thưởng'>
            <DatePicker className='w-full' />
          </Form.Item>
          <Form.Item name='product' label='Sản phẩm áp dụng'>
            <MultipleSelect form={form} getListOption={[]} />
          </Form.Item>
          <Form.Item name='button' className='float-right clear-right mt-5'>
            <Button type='primary' htmlType='submit' className='font-bold'>
              {titleButton}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
export default ActionComponent;

ActionComponent.propTypes = {
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  titleButton: PropTypes.string,
  dataRepair: PropTypes.object,
  isUpdate: PropTypes.number,
};
ActionComponent.defaultProps = {
  titleButton: '',
  isUpdate: 1,
  dataRepair: {},
};
