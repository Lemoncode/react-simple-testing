import * as React from 'react';
import { App } from './app';
import { GeneralRoutes } from './pages/general';
import { AdminRoutes } from './pages/admin';

export const AppRoutes: React.StatelessComponent = (props) => (
  <App>
    <GeneralRoutes />
    <AdminRoutes />
  </App>
);
