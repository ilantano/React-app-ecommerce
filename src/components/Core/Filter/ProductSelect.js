import { get } from 'lodash';
import { Form, Select, Row, Col, message } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MESSAGE from '@/constants/message';
import VALUE_SELECT_ALL from './constants';

const { Item } = Form;
const { Option } = Select;

function ProductSelect({ getListOrderProductApi, form }) {
  const [listProduct, setListProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(['']);

  const orderProductRef = useRef(null);

  useEffect(async () => {
    try {
      const results = await getListOrderProductApi();
      setListProduct(get(results, 'data') || []);
    } catch (error) {
      return message.error(MESSAGE.DISCOUNT_ERROR);
    }
    return null;
  }, []);

  const onSelectAgency = (value) => {
    if (
      value !== VALUE_SELECT_ALL &&
      selectedProduct.length + 1 < listProduct.length
    ) {
      const newSelectAgency = selectedProduct.filter(
        (agency) => agency !== VALUE_SELECT_ALL,
      );
      form.setFieldsValue({ product: [...newSelectAgency, value] });
      return setSelectedProduct([...newSelectAgency, value]);
    }
    setSelectedProduct([VALUE_SELECT_ALL]);
    form.setFieldsValue({ product: VALUE_SELECT_ALL });
    return null;
  };

  const handleDeSelect = (value) => {
    setSelectedProduct(selectedProduct.filter((agency) => agency !== value));
  };
  return (
    <Row>
      <Col span={16}>
        <Item name='productId' label='Sản phẩm' wrapperCol={{ span: 20 }}>
          <Select
            mode='multiple'
            placeholder='Thêm sản phẩm'
            optionLabelProp='label'
            ref={orderProductRef}
            showAction={['focus']}
            defaultValue={selectedProduct}
            onSelect={onSelectAgency}
            onDeselect={handleDeSelect}
            id='setectProduct'
          >
            <Option value='' label='Tất cả'>
              Tất cả
            </Option>
            {listProduct.map((product) => (
              <Option
                key={product?.id}
                label={product?.productName}
                value={product?.id}
              >
                {product?.productName}
              </Option>
            ))}
          </Select>
        </Item>
      </Col>
    </Row>
  );
}

export default ProductSelect;
ProductSelect.propTypes = {
  getListOrderProductApi: PropTypes.func.isRequired,
  form: PropTypes.any.isRequired,
};
