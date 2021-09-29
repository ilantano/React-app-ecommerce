import { Select, Button } from 'antd';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as constants from '../constants';
import FilterItem from './FilterItem';
import FilterRangeAge from './FilterRangeAge';
import FilterTimeUpdate from './FilterTimeUpdate';

const { Option } = Select;

export default function FilterDashboard({
  initialFilter,
  handleFilterDashboardInformation,
}) {
  const [filterOption, setFilterOption] = useState(initialFilter);
  const [isReset, setIsReset] = useState(false);

  const birthdayNumberOption = () => {
    const children = [];
    for (let index = 1; index < 32; index += 1) {
      children.push(<Option key={index}>{index}</Option>);
    }
    return children;
  };

  const childNumberOption = () => {
    const childOption = constants.FILTER_NUMBER.map((number) => (
      <Option key={number}>{number}</Option>
    ));
    return childOption;
  };

  const [childOption] = useState(() => childNumberOption());

  const handleChangeFilter = (listNumber) => {
    setFilterOption({ ...filterOption, ...listNumber });
  };

  const handleChangeAgeRange = (rangeAge) => {
    setFilterOption({ ...filterOption, ...rangeAge });
  };

  const handleChangeTimeUpdate = (timeUpdate) => {
    setFilterOption({ ...filterOption, ...timeUpdate });
  };

  const cancelReset = () => {
    setIsReset(false);
    setFilterOption({
      birthdayList: [],
      endAge: 150,
      endDate: '',
      expressionList: [],
      heartDesireList: [],
      lifePathList: [],
      personalityList: [],
      startAge: 1,
      startDate: '',
    });
  };

  const handleFilter = () => {
    handleFilterDashboardInformation(filterOption);
  };
  return (
    <>
      <div>
        <FilterItem
          optionSelect={childOption}
          objectFilter={constants.LIFE_PATH}
          handleChangeFilter={handleChangeFilter}
          isReset={isReset}
          cancelReset={cancelReset}
        />
        <FilterItem
          optionSelect={childOption}
          objectFilter={constants.EXPRESSION}
          handleChangeFilter={handleChangeFilter}
          isReset={isReset}
          cancelReset={cancelReset}
        />
        <FilterItem
          optionSelect={birthdayNumberOption}
          objectFilter={constants.BIRTHDAY}
          handleChangeFilter={handleChangeFilter}
          isReset={isReset}
          cancelReset={cancelReset}
        />
        <FilterItem
          optionSelect={childOption}
          objectFilter={constants.HEART_DESIRE}
          handleChangeFilter={handleChangeFilter}
          isReset={isReset}
          cancelReset={cancelReset}
        />
        <FilterItem
          optionSelect={childOption}
          objectFilter={constants.PERSONALITY}
          handleChangeFilter={handleChangeFilter}
          isReset={isReset}
          cancelReset={cancelReset}
        />
        <FilterRangeAge
          handleChangeAgeRange={handleChangeAgeRange}
          isReset={isReset}
          cancelReset={cancelReset}
        />
        <FilterTimeUpdate
          handleChangeTimeUpdate={handleChangeTimeUpdate}
          isReset={isReset}
          cancelReset={cancelReset}
        />
      </div>
      <div>
        <Button
          size='large'
          width='8rem'
          marginWrapButton='0 0.25rem'
          onClick={() => setIsReset(true)}
          id='btnReset'
        >
          Đặt lại
        </Button>
        <Button
          variant='green'
          size='large'
          width='8rem'
          marginWrapButton='0 0.25rem'
          onClick={handleFilter}
          id='btnApply'
        >
          Áp dụng
        </Button>
      </div>
    </>
  );
}

FilterDashboard.propTypes = {
  initialFilter: PropTypes.object.isRequired,
  handleFilterDashboardInformation: PropTypes.func.isRequired,
};
