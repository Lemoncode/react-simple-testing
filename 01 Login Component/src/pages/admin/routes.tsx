import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { adminRoutes } from '../../common/constants/routes/admin';
import { MemberListPageContainer } from './member';

export const AdminRoutes: React.StatelessComponent = (props) => (
  <Switch>
    <Route exact={true} path={adminRoutes.default} component={MemberListPageContainer} />
    <Route path={adminRoutes.memberList} component={MemberListPageContainer} />
  </Switch>
);
