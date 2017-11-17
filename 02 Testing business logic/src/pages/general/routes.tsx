import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { generalRoutes } from '../../common/constants/routes/general';
import { LoginPageContainer } from './login';

export const GeneralRoutes: React.StatelessComponent = (props) => (
  <Switch>
    <Route exact={true} path={generalRoutes.default} component={LoginPageContainer} />
    <Route path={generalRoutes.login} component={LoginPageContainer} />
  </Switch>
);
