import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Layout, Button, Drawer, Breadcrumb } from 'antd';
import { CaretLeftOutlined, LogoutOutlined } from '@ant-design/icons';
import { AUTHOR_ROUTERS } from '@/router/routes';
import { removeToken, TOKEN_KEY } from '@/utils/cookie';
import {
  getLocalStorage,
  removeLocalStorage,
  LOCAL_STORAGE_KEY,
} from '@/utils/localstorage';
import { hasPermission, getPathRouterByName } from '../../router/utils';

export default function SubNavbar() {
  const location = useLocation();
  const history = useHistory();
  let roadmap = [];
  const [isShowDrawer, setShowDrawer] = useState(false);
  const [roadmapShow, setRoadmapShow] = useState([]);
  const userName = getLocalStorage(LOCAL_STORAGE_KEY.USER_NAME);

  const pushRouterGrandChildren = (item) => {
    roadmap.push(item);
  };

  const generateRoadmap = (routers, index, path) => {
    const router = routers?.find(
      (item) => item?.path?.split('/')[1] === path[index],
    );
    if (router) {
      pushRouterGrandChildren(router);
      if (index + 1 > path?.length) return;
      generateRoadmap(router?.children, index + 1, path);
    }
  };

  const handleClickLogout = () => {
    removeToken(TOKEN_KEY.TOKEN);
    removeLocalStorage(LOCAL_STORAGE_KEY.USER_NAME);
    removeLocalStorage(LOCAL_STORAGE_KEY.ROLE);
    history.push('/dang-nhap');
  };

  useEffect(() => {
    roadmap = [];
    const path = location?.pathname?.split('/');
    generateRoadmap(AUTHOR_ROUTERS, 1, path);
    setRoadmapShow(roadmap);
  }, [location]);

  const handleClickChangeRouter = (name) => {
    history.push(getPathRouterByName(name));
  };

  // const handleChangeIdAgency = (newAgencyId) => {
  //   dispatch(updateAgencyId(newAgencyId));
  //   // khi swith đại lý nếu đang ở tab thứ 4 thì sẽ quay lại tab thứ 3.
  //   // Ví dụ khi đang ở màn chi tiết thì sẽ quay lại màn danh sách
  //   if (roadmapShow?.length === 4) {
  //     handleClickChangeRouter(roadmapShow?.[2]?.name);
  //   }
  //   history.go(0);
  // };
  return (
    <Layout.Header className='sticky top-0 h-auto px-5 bg-white shadow-md'>
      <div className='flex justify-between h-16 border-b'>
        <div className='flex items-center'>
          {roadmapShow.length > 0 &&
            roadmapShow?.[1]?.children?.map(
              (item) =>
                !item?.meta?.isHidden &&
                hasPermission(item) && (
                  <Button
                    className={
                      item?.name === roadmapShow?.[roadmapShow.length - 1].name
                        ? 'btn-header btn-header-selected'
                        : 'btn-header'
                    }
                    id='btnSubMenu'
                    key={item?.name}
                    onClick={() => handleClickChangeRouter(item?.name)}
                  >
                    {item?.meta?.title}
                  </Button>
                ),
            )}
        </div>

        <div className='flex items-center'>
          {/* {hasPermissionAgency(currentRole) && (
            <Select
              className='w-50'
              onChange={handleChangeIdAgency}
              value={agencies?.find((name) => name.id === agencyId)?.agencyName}
            >
              {agencies?.map((agency) => (
                <Select.Option
                  key={agency.id}
                  value={agency.id}
                  label={agency.agencyName}
                >
                  {agency.agencyName}
                </Select.Option>
              ))}
            </Select>
          )} */}

          <button
            onClick={() => setShowDrawer(true)}
            type='button'
            id='btnHello'
            className='flex items-center h-12 px-3 py-1 text-gray-500 rounded hover:bg-gray-100 focus:outline-none focus:bg-gray-200'
          >
            <span className='mr-1 text-gray-400'>Xin chào,</span>
            {userName}
          </button>
          <Drawer
            title='Menu'
            placement='right'
            onClose={() => setShowDrawer(false)}
            visible={isShowDrawer}
          >
            <Button
              className='w-full text-center'
              onClick={handleClickLogout}
              id='btnLogout'
            >
              <LogoutOutlined />
              Đăng xuất
            </Button>
          </Drawer>
        </div>
      </div>
      <div className='flex items-center justify-between h-12 bg-white '>
        <div className='flex items-center'>
          <button
            onClick={() => history.go(-1)}
            type='button'
            id='btnGoBack'
            className='flex items-center text-gray-400 hover:text-gray-500 focus:outline-none'
          >
            <CaretLeftOutlined className='mr-1' />
            Quay lại
          </button>
          <Breadcrumb separator='>'>
            {roadmapShow?.map((item, index) =>
              // chỉ breadcrumnb thứ 3 mới được trở lại
              index !== 2 ? (
                <Breadcrumb.Item key={item.name}>
                  <span
                    className={
                      index === roadmapShow?.length - 1
                        ? 'text-gray-500 font-bold'
                        : ''
                    }
                  >
                    {item?.meta?.title}
                  </span>
                </Breadcrumb.Item>
              ) : (
                <Breadcrumb.Item
                  key={item.name}
                  className='font-medium text-gray-400 cursor-pointer hover:text-gray-500'
                  onClick={() => handleClickChangeRouter(item?.name)}
                >
                  <span
                    className={
                      index === roadmapShow?.length - 1
                        ? 'text-gray-500 font-bold'
                        : ''
                    }
                  >
                    {item?.meta?.title}
                  </span>
                </Breadcrumb.Item>
              ),
            )}
          </Breadcrumb>
        </div>
        <div />
      </div>
    </Layout.Header>
  );
}
