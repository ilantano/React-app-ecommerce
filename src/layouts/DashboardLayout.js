import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { DEFAULT_OPTION_KEY } from '@/constants/listProductContants';
import { getToken, TOKEN_KEY } from '../utils/cookie';
import { AUTHOR_ROUTERS } from '../router/routes';
import IconCollapsed from '../assets/icon/Core/IconCollapsed';
import { hasPermission, getPathRouterByName } from '../router/utils';
import { ROUTER_ROADMAP } from '../router/constants';
import SubNavbar from '../components/Core/SubNavbar';

export default function DashboardLayout({ children }) {
  const history = useHistory();
  // const location = useLocation();
  // const paramArr = location?.pathname?.split('/');

  const token = getToken(TOKEN_KEY.TOKEN);

  // const result = ROUTER_ROADMAP.MENU.find((item) =>
  //   item.map((values) => values?.path === paramArr?.[2]),
  // ).find((item) => item?.path === paramArr?.[2])?.title;

  const { Sider, Content } = Layout;
  const { SubMenu, Item } = Menu;
  const [collapsed, setCollapsed] = useState(false);

  if (!token) {
    history.push(ROUTER_ROADMAP.SIGNIN);
  }

  const handleClickCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const getFirstPathHasPermission = (router) => {
    if (router?.children?.length === 0) return router;
    return router?.children?.find((item) => hasPermission(item));
  };

  const handleClickItem = (router) => {
    const newRouter = getFirstPathHasPermission(router);
    history.push(getPathRouterByName(newRouter?.name));
  };

  return (
    <Layout className='w-screen h-screen overflow-hidden'>
      <Sider
        width={270}
        trigger={null}
        collapsible
        collapsed={collapsed}
        className='bg-primary-900'
      >
        <div className='flex items-center justify-between w-full h-16 px-6 py-4'>
          {!collapsed && (
            <h1 className='text-xl font-black tracking-wider text-white'>
              happyluck68
            </h1>
          )}
          <button
            onClick={() => handleClickCollapsed()}
            type='button'
            className='focus:outline-none boder:none'
          >
            <IconCollapsed collapsed={collapsed} />
          </button>
        </div>
        <Menu
          mode='inline'
          className='menu-sidebar'
          theme='dark'
          defaultOpenKeys={DEFAULT_OPTION_KEY}
          // defaultSelectedKeys={[result]}
        >
          {AUTHOR_ROUTERS?.map((item) => {
            if (item?.children?.length === 0 && !item?.meta?.isHidden) {
              return (
                <Item
                  key={item.name}
                  onClick={() => handleClickItem(item)}
                  icon={item?.meta?.icon}
                >
                  <span className='ml-3'>{item?.meta?.title}</span>
                </Item>
              );
            }
            if (item?.children?.length > 0) {
              return (
                <SubMenu
                  key={item.name}
                  title={!collapsed ? item?.meta?.title : ''}
                  icon={item?.meta?.icon}
                >
                  {item?.children?.map(
                    (child) =>
                      !child?.meta?.isHidden &&
                      hasPermission(child) && (
                        <Item
                          key={child?.name}
                          onClick={() => handleClickItem(child)}
                        >
                          {child?.meta?.title}
                        </Item>
                      ),
                  )}
                </SubMenu>
              );
            }
            return <></>;
          })}
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <SubNavbar />
        <Content
          className='overflow-y-scroll'
          style={{
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.any.isRequired,
};
