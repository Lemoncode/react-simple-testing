import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export const App: React.StatelessComponent = (props) => (
  <MuiThemeProvider>
    <div className="container-fluid">
      {props.children}
    </div>
  </MuiThemeProvider>
);
