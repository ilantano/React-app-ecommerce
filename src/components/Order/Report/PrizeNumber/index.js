import React, { useState, useEffect } from 'react';
import { Form, Select, Button, DatePicker, Row, Col } from 'antd';
import moment from 'moment';
import { DATE_FORMAT } from '@/utils/format';
import HANDLE_ERROR from '@/utils/handleError';
import { getLocalStorage, LOCAL_STORAGE_KEY } from '@/utils/localstorage';
import {
  callGetApiCustomerMenu,
  callGetApiProductPlayTypes,
} from '@/pages/sales/report/prizeNumber/api';
import { callGetApiISummaryAgencies } from '@/pages/sales/report/synthetic/api';
import { ERROR } from './constants';

const { Option } = Select;

const PrizeNumberComponent = () => {
  const [form] = Form.useForm();

  const [dataAgency, setDataAgency] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [listPlayTypes, setListPlayTypes] = useState([]);
  const [selectProduct, setSelectProduct] = useState();
  const [selectCategory, setSelectCategory] = useState();
  const [namePlaytype, setNamePlaytype] = useState('');
  const [agencyName, setAgencyName] = useState('');
  const [productName, setProductName] = useState('');
  const [categoryName, setCategoryName] = useState('');

  const agencyId = getLocalStorage(LOCAL_STORAGE_KEY.AGENCY_ID);

  useEffect(async () => {
    try {
      const [productResult, playTypesResult, agencyResult] = await Promise.all([
        callGetApiCustomerMenu(),
        // token de lay data truyen mac dinh
        callGetApiProductPlayTypes({ token: 'true' }),
        callGetApiISummaryAgencies(),
      ]);
      setListProduct(productResult?.data);
      setDataAgency(agencyResult?.data);

      const newArrayPlayTypes = Object?.entries(playTypesResult?.data)?.map(
        (item) => {
          return { code: item?.[0], value: item?.[1] };
        },
      );
      setListPlayTypes(newArrayPlayTypes);

      const codeType = productResult?.data?.[0]?.subMenu?.find(
        (play) => play.id === productResult?.data?.[0]?.subMenu?.[0]?.id,
      )?.code;

      const codeProduct = newArrayPlayTypes?.find(
        (item) => item?.code === codeType,
      );

      form.setFieldsValue({
        agency: agencyResult?.data?.find(
          (item) => item.id === parseInt(agencyId, 10),
        )?.id,
        date: moment(),
        category: productResult?.data?.[0]?.id,
        product: productResult?.data?.[0]?.subMenu?.[0]?.id,
        playTypes: codeProduct?.value?.subMenuPlayStyle?.[0]?.id,
      });

      setSelectProduct(productResult?.data?.[0]?.id);
      setSelectCategory(codeType);
    } catch (error) {
      HANDLE_ERROR(error);
    }
  }, []);

  const handleSelectCategory = (key, value) => {
    setCategoryName(value?.children);
    setSelectProduct(value?.value);
    form.setFieldsValue({
      product: '',
      playTypes: '',
    });
    setNamePlaytype('');
  };

  const handleSelectProduct = (key, value) => {
    setProductName(value?.children);
    setSelectCategory(
      listProduct
        ?.find((item) => item?.id === selectProduct)
        ?.subMenu?.find((play) => play.id === value?.value)?.code,
    );
    form.setFieldsValue({ playTypes: '' });
    setNamePlaytype('');
  };

  const handleFinish = () => {
    const params = {
      categoryId: form.getFieldsValue()?.category,
      productId: form.getFieldsValue()?.product,
      playStyleId: form.getFieldsValue()?.playTypes,
      agencyId: form.getFieldsValue()?.agency,
      date: moment(form.getFieldsValue()?.date).format('DD-MM-YYYY'),
      agencyName: agencyName || dataAgency?.[0]?.name,
      productName: productName || listProduct?.[0]?.subMenu?.[0]?.menu,
      categoryName: categoryName || listProduct?.[0]?.menu,
      playStyleName:
        namePlaytype ||
        listPlayTypes?.find(
          (item) =>
            item?.code ===
            listProduct?.[0]?.subMenu?.find(
              (play) => play.id === listProduct?.[0]?.subMenu?.[0]?.id,
            )?.code,
        )?.value?.subMenuPlayStyle?.[0]?.name,
    };
    window.open(
      `${process.env.REACT_APP_URL}export?categoryId=${params?.categoryId}&productId=${params?.productId}&playStyleId=${params?.playStyleId}&agencyId=${params?.agencyId}&date=${params?.date}&playStyleName=${params?.playStyleName}&agencyName=${params?.agencyName}&categoryName=${params?.categoryName}&productName=${params?.productName}`,
      '_blank',
      'noopener,noreferrer',
    );
  };

  const handleChangePlayTypes = (key, value) => {
    setNamePlaytype(value?.children);
  };

  const changeChangeAgency = (key, value) => {
    setAgencyName(value?.children);
  };

  const handleValidateProduct = (rules, value, callback) => {
    if (!value) {
      return callback(ERROR.PRODUCT);
    }
    return Promise.resolve();
  };

  const handleValidatePlayType = (rules, value, callback) => {
    if (!value) {
      return callback(ERROR.PLAY_TYPE);
    }
    return Promise.resolve();
  };

  return (
    <>
      <Form form={form} onFinish={handleFinish} layout='vertical'>
        <Row gutter={30}>
          <Col span={8}>
            <Form.Item name='category' label='Sản phẩm'>
              <Select onChange={handleSelectCategory}>
                {listProduct?.map((category) => (
                  <Option key={category.id} value={category.id}>
                    {category?.menu}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name='product'
              label='Loại hình'
              rules={[{ validator: handleValidateProduct }]}
            >
              <Select onChange={handleSelectProduct}>
                {listProduct
                  ?.find((item) => item?.id === selectProduct)
                  ?.subMenu?.map((product) => (
                    <Option key={product.id} value={product.id}>
                      {product?.menu}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name='playTypes'
              label='Cách chơi'
              rules={[{ validator: handleValidatePlayType }]}
            >
              <Select onChange={handleChangePlayTypes}>
                {listPlayTypes
                  ?.find((item) => item?.code === selectCategory)
                  ?.value?.subMenuPlayStyle?.map((type) => (
                    <Option key={type.id} value={type.id}>
                      {type?.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name='agency' label='Đại lý'>
              <Select onChange={changeChangeAgency}>
                {dataAgency?.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item?.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label='Thời gian' name='date'>
              <DatePicker
                lable='Ngày dự thưởng'
                className='w-full'
                format={DATE_FORMAT.DAY_MONTH_YEAR}
                placeholder={['Thời gian']}
                disabledDate={(current) => current >= moment().add('days')}
              />
            </Form.Item>
          </Col>
          <Col span={8} className='flex items-end'>
            <Form.Item name='btn' label=''>
              <Button type='primary' htmlType='submit' className='uppercase'>
                Xuất báo cáo
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default PrizeNumberComponent;
