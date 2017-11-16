import * as React from 'react';
import { Link } from 'react-router-dom';
import { generalRoutes } from '../../../../common/constants/routes/general';

export const MemberListPage: React.StatelessComponent = (props) => (
  <div>
    <h1>Member list Page</h1>
    <Link
      to={generalRoutes.login}
    >
      Go back
    </Link>
  </div>
);
