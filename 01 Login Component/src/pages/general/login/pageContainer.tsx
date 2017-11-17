import * as React from 'react';
import {
  LoginCredential, createEmptyLoginCredential,
  LoginCredentialError, createEmptyLoginCredentialError,
} from './viewModel';
import { history } from '../../../history';
import { adminRoutes } from '../../../common/constants/routes/admin';
import { LoginPage } from './page';

interface State {
  loginCredential: LoginCredential;
  loginCredentialError: LoginCredentialError;
}

export class LoginPageContainer extends React.Component<{}, State> {
  state = {
    loginCredential: createEmptyLoginCredential(),
    loginCredentialError: createEmptyLoginCredentialError(),
  };

  onUpdateField = (field: string, value: string) => {
    this.setState({
      ...this.state,
      loginCredential: {
        ...this.state.loginCredential,
        [field]: value,
      },
    });
  }

  onLogin = () => {
    if (this.state.loginCredential.login === 'admin' &&
      this.state.loginCredential.password === 'test') {
      history.push(adminRoutes.memberList);
    }
  }

  render() {
    return (
      <LoginPage
        loginCredential={this.state.loginCredential}
        loginCredentialError={this.state.loginCredentialError}
        onUpdateField={this.onUpdateField}
        onLogin={this.onLogin}
      />
    );
  }
}
