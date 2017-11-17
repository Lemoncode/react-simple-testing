import * as React from 'react';

export const HeaderComponent: React.StatelessComponent = (props) => (
  <div className="panel-heading">
    <h3 className="panel-title">
      <p>Please sign in</p>
      <p>(login: admin / pwd: test)</p>
    </h3>
  </div>
);
