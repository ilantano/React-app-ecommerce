import { Col, message, Row } from 'antd';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import formatURLQueryToObject from '@/utils/common';
import MESSAGE from '@/constants/message';
import { callApiGetDashBoardInformation } from '@/api/dashBoard';
import dashBoardIcon from '@/assets/icon/DashBoard/dashboard-icon.svg';
import FilterDashboard from '../../components/Core/Dashboard/Filter/FilterDashboard';
import DashBoardTable from '../../components/Core/Dashboard/Table';

export default function Dashboard() {
  const [dashBoardInformation, setDashBoardInformation] = useState([]);
  const [currentFilter, setCurrentFilter] = useState({
    lifePathList: [],
    expressionList: [],
    birthdayList: [],
    heartDesireList: [],
    personalityList: [],
    startAge: 1,
    endAge: 150,
    startDate: '',
    endDate: '',
  });
  const history = useHistory();
  const location = useLocation();
  const { page, limit } = formatURLQueryToObject(get(location, 'search'));
  const [currentPaging, setCurrentPaging] = useState(() => {
    const paging = get(location, 'search')
      ? { pageNo: page, pageSize: limit }
      : {
          pageNo: 1,
          pageSize: 10,
        };
    return { ...paging, total: 10 };
  });

  const { pageNo, pageSize, total } = currentPaging;

  const getAllDashBoardInformation = async (currPage, currFilter) => {
    const results = await callApiGetDashBoardInformation(currPage, currFilter);
    if (get(results, 'status') !== 200 || results.error) {
      return message.error(MESSAGE.GET_INFORMATION_FAILED);
    }
    setDashBoardInformation(get(results, 'data.resource'));
    setCurrentPaging({
      ...currentPaging,
      total: get(results, 'data.total'),
    });
    return null;
  };

  const [isRunFirst, setIsRunFirst] = useState(true);

  useEffect(() => {
    getAllDashBoardInformation(currentPaging, currentFilter);
    history.push(`?page=${pageNo}&limit=${pageSize}`);
  }, []);

  useEffect(() => {
    if (isRunFirst) {
      setIsRunFirst(false);
      return;
    }
    getAllDashBoardInformation(
      { pageSize: limit, pageNo: page },
      currentFilter,
    );
    setCurrentPaging({ ...currentPaging, pageSize: limit, pageNo: page });
  }, [limit, page]);

  const handleFilterDashboardInformation = (filterValue) => {
    getAllDashBoardInformation({ pageNo: 1, pageSize: 10 }, filterValue);
    setCurrentFilter(filterValue);
  };

  const handleChangePaging = (paging) => {
    getAllDashBoardInformation(paging, currentFilter);
    history.push(`?page=${paging.pageNo}&limit=${paging.pageSize}`);
  };

  return (
    <>
      <div className='dashboard__top'>
        <img src={dashBoardIcon} alt='dashboard icon' />
        <span className='dashboard__top--title'> Dashboard Thông Tin</span>
      </div>
      <Row>
        <Col xs={12} sm={12} md={5} lg={5}>
          <div className='dashboard__left'>
            <FilterDashboard
              handleFilterDashboardInformation={
                handleFilterDashboardInformation
              }
              initialFilter={currentFilter}
            />
          </div>
        </Col>
        <Col xs={12} sm={12} md={19} lg={19}>
          <DashBoardTable
            dashBoardInformation={dashBoardInformation}
            handleChangePaging={handleChangePaging}
            total={total}
            pageNo={+pageNo}
            pageSize={+pageSize}
          />
        </Col>
      </Row>
    </>
  );
}
