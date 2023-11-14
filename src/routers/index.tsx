import {Spin} from 'antd';
import 'locales/i18n';
import {uniqueId} from 'lodash';
import React, {Suspense, lazy, useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {PageRoute} from 'constants/route';
import {TitlePage} from 'components/TitlePage';
import AuthLayout from 'layouts/AuthLayout';
import MainLayout from 'layouts/MainLayout';
import NotFoundPage from '../pages/error';
import RequireAuth from 'routers/RequireAuth';
import ValidateLogin from 'routers/ValidateLogin';
import {AuthService} from 'services/auth.service';
import Container from 'typedi';

type RouteType = {
  index?: boolean;
  path?: string;
  title?: string;
  element: React.LazyExoticComponent<React.ComponentType<unknown>>;
  children?: RouteType[];
};
const APP_NAME = process.env.APP_NAME || 'NSK_ADMIN';
const titlePage = (title: string) => `${APP_NAME} - ${title}`;
const lazyLoadRoute = (pageName: string) =>
  lazy(() => import(`../pages/${pageName}`));

const publicRoutes: RouteType[] = [
  {
    path: PageRoute.LOGIN,
    element: lazyLoadRoute('Base'),
    children: [
      {
        index: true,
        title: titlePage('Login'),
        element: lazyLoadRoute('auth/login'),
      },
    ],
  },
];
const privateRoutes: RouteType[] = [
  {
    path: '/',
    title: titlePage('Dashboard'),
    element: lazyLoadRoute('Dashboard'),
  },
];
const renderRoutes = (routes: RouteType[]) =>
  routes.map(({element: Element, ...pageOptions}) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const routeOptions: any = pageOptions.index
      ? {index: true}
      : {path: pageOptions.path};

    return (
      <Route
        key={uniqueId('__page__')}
        path={pageOptions.path}
        element={
          <Suspense fallback={<Spin />}>
            <TitlePage title={pageOptions.title}>
              <Element />
            </TitlePage>
          </Suspense>
        }
        {...routeOptions}
      >
        {pageOptions?.children?.map(
          ({element: ChildrenElement, ...childrenOption}) =>
            childrenOption.index ? (
              <Route
                key={uniqueId('__page__')}
                index
                element={
                  <Suspense fallback={<Spin />}>
                    <TitlePage title={childrenOption.title}>
                      <ChildrenElement />
                    </TitlePage>
                  </Suspense>
                }
              />
            ) : (
              <Route
                key={uniqueId('__page__')}
                path={childrenOption.path}
                element={
                  <Suspense fallback={<Spin />}>
                    <TitlePage title={childrenOption.title}>
                      <ChildrenElement />
                    </TitlePage>
                  </Suspense>
                }
              >
                {childrenOption?.children &&
                  renderRoutes(childrenOption.children)}
              </Route>
            ),
        )}
      </Route>
    );
  });
export default function RoutesApp() {
  const [routes, setRoutes] = useState<RouteType[]>([]);
  const authService: AuthService = Container.get(AuthService);
  const isSignedIn = authService.isSignedIn();
  useEffect(() => {
    setRoutes(privateRoutes);
  }, [isSignedIn]);
  return (
    <Suspense fallback={<Spin />}>
      <BrowserRouter>
        {isSignedIn === null ? (
          <Spin />
        ) : (
          <>
            <Routes>
              <Route
                element={
                  <ValidateLogin>
                    <AuthLayout />
                  </ValidateLogin>
                }
              >
                {renderRoutes(publicRoutes)}
              </Route>

              <Route
                element={
                  <RequireAuth>
                    <MainLayout />
                  </RequireAuth>
                }
              >
                {renderRoutes(routes)}
              </Route>

              <Route
                path="*"
                element={
                  <Suspense fallback={<Spin />}>
                    <TitlePage title={titlePage('Page not found')}>
                      <NotFoundPage />
                    </TitlePage>
                  </Suspense>
                }
              />
            </Routes>
          </>
        )}
      </BrowserRouter>
    </Suspense>
  );
}
