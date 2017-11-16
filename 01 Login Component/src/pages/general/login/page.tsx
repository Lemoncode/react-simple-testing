import * as React from 'react';
import { Link } from 'react-router-dom';
import { adminRoutes } from '../../../common/constants/routes/admin';

export const LoginPage: React.StatelessComponent = (props) => (
  <div>
    <h1>Login Page</h1>
    <Link to={adminRoutes.memberList}>
      Navigate to Member List
    </Link>
  </div>
);
