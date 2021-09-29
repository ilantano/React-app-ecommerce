import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthLayout from '../layouts/DashboardLayout';
import NoAuthLayout from '../layouts/SignInLayout';
import { AUTHOR_ROUTERS, NOT_AUTHOR_ROUTER, CUSTOMER_ROUTER } from './routes';
import { hasPermission } from './utils';

const routerPermission = [];

const generateRouter = (routers, pathParent = '') =>
  routers?.map((router) => {
    if (hasPermission(router)) {
      routerPermission.push(
        <Route
          key={router?.name}
          path={pathParent + router?.path}
          exact
          component={router?.meta?.component}
        />,
      );
    }
    if (router?.children?.length > 0) {
      generateRouter(router?.children, pathParent + router?.path);
    }
    return null;
  });

function renderRouter(router) {
  generateRouter(router);
  return routerPermission?.map((item) => item);
}

const renderRouterSystem = (router) =>
  router?.map((item) => (
    <Route
      key={item?.name}
      path={item?.path}
      exact
      component={item?.meta?.component}
    />
  ));

const ReactRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/:path?' exact>
        <NoAuthLayout>
          <Switch>{renderRouterSystem(NOT_AUTHOR_ROUTER)}</Switch>
        </NoAuthLayout>
      </Route>
      <Route path='/other/:path?' exact>
        <NoAuthLayout>
          <Switch>{renderRouterSystem(CUSTOMER_ROUTER)}</Switch>
        </NoAuthLayout>
      </Route>
      <Route>
        <AuthLayout>
          <Switch>{renderRouter(AUTHOR_ROUTERS)}</Switch>
        </AuthLayout>
      </Route>
    </Switch>
  </BrowserRouter>
);

export default ReactRouter;
