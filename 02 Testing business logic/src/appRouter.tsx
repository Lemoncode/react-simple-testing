import * as React from 'react';
import { Router } from 'react-router-dom';
import { history } from './history';
import { AppRoutes } from './appRoutes';

export const AppRouter: React.StatelessComponent = (props) => (
  <Router
    history={history}
  >
    <AppRoutes />
  </Router>
);
