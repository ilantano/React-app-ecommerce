import React, { useEffect } from 'react';
import { Form, Drawer, Input, Select, TimePicker, Button } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';

const RepairComponent = ({
  isVisable,
  setIsVisable,
  handleCancel,
  dataDrawSchedule,
}) => {
  const [form] = Form.useForm();
  const format = 'HH:mm';

  useEffect(() => {
    form.resetFields();
  }, [isVisable]);

  useEffect(() => {
    form.setFieldsValue({
      products: dataDrawSchedule?.productName || '',
      time: dataDrawSchedule?.timeSprint
        ? moment(dataDrawSchedule?.timeSprint, format)
        : '',
      keyword: dataDrawSchedule?.timeClose || '',
    });
  }, []);

  const handelFinish = () => {
    setIsVisable(false);
    form.resetFields();
  };
  return (
    <Drawer
      title='Sửa thời gian quay thưởng'
      onClose={handleCancel}
      visible={isVisable}
      width={520}
    >
      <Form form={form} layout='vertical' onFinish={handelFinish}>
        <Form.Item name='products' label='Sản phẩm' className='w-full'>
          <Select>
            <Select.Option>1</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name='time' label='Thời gian quay thưởng'>
          <TimePicker
            placeholder={['Thời gian']}
            format={format}
            className='w-full'
            showNow={false}
            onSelect={(value) =>
              form.setFieldsValue({ ...form.values, time: value })
            }
          />
        </Form.Item>
        <Form.Item
          name='keyword'
          label='Đóng hệ thống trước'
          className='w-full'
        >
          <Input />
        </Form.Item>
        <Form.Item name='btn' className='float-right clear-right mt-5'>
          <Button type='primary' htmlType='submit'>
            CẬP NHẬT
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default RepairComponent;

RepairComponent.propTypes = {
  isVisable: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  setIsVisable: PropTypes.func.isRequired,
  dataDrawSchedule: PropTypes.object,
};
RepairComponent.defaultProps = {
  dataDrawSchedule: {},
};
