import React from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider } from 'antd';
import withReduxStore from '@/utils/with-redux-store';
import vi from 'antd/lib/locale/vi_VN';
import './App.css';
import './assets/css/tailwind.css';
import './assets/css/components.css';
import { Provider } from 'react-redux';
import Router from './router';

const App = ({ reduxStore }) => (
  <div>
    <ConfigProvider locale={vi}>
      <Provider store={reduxStore}>
        <Router />
      </Provider>
    </ConfigProvider>
    <div className='version'>Version: 0.009</div>
  </div>
);

App.propTypes = {
  reduxStore: PropTypes.any.isRequired,
};

export default withReduxStore(App);
