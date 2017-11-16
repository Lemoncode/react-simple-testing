import * as React from 'react';
import { App } from './app';
import { GeneralRoutes } from './pages/general';

export const AppRoutes: React.StatelessComponent = (props) => (
  <App>
    <GeneralRoutes />
  </App>
);
