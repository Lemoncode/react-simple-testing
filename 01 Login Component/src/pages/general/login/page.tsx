import * as React from 'react';
import { Link } from 'react-router-dom';
import { adminRoutes } from '../../../common/constants/routes/admin';
import { LoginCredential, LoginCredentialError } from './viewModel';
import { HeaderComponent, FormComponent } from './components';
const styles = require('./page.scss');

interface Props {
  loginCredential: LoginCredential;
  loginCredentialError: LoginCredentialError;
  onUpdateField(field: string, value: string): void;
  onLogin(): void;
}

export const LoginPage: React.StatelessComponent<Props> = (props) => (
  <div className={`${styles.page} row`}>
    <div className="col-md-4 col-md-offset-4">
      <div className="panel panel-default">
        <HeaderComponent />
        <FormComponent
          loginCredential={props.loginCredential}
          loginCredentialError={props.loginCredentialError}
          onUpdateField={props.onUpdateField}
          onLogin={props.onLogin}
        />
      </div>
    </div>
  </div>
);
