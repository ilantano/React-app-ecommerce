import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import mockAxios from './mocks';
import reportWebVitals from './reportWebVitals';

const { REACT_APP_USE_MOCK_DATA } = process.env;

if (REACT_APP_USE_MOCK_DATA === 'true') {
  mockAxios();
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
