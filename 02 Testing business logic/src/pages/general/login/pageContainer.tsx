import * as React from 'react';
import {
  LoginCredential, createEmptyLoginCredential,
  LoginCredentialError, createEmptyLoginCredentialError,
} from './viewModel';
import { State } from './pageContainer.state';
import * as business from './pageContainer.business';
import { validations } from './validations';
import { LoginPage } from './page';

export class LoginPageContainer extends React.Component<{}, State> {
  state = {
    loginCredential: createEmptyLoginCredential(),
    loginCredentialError: createEmptyLoginCredentialError(),
  };

  onUpdateField = (field: string, value: string) => {
    validations
      .validateField(this.state.loginCredential, field, value)
      .then((fieldValidationResult) => {
        this.setState(business.onUpdateField(field, value, fieldValidationResult));
      });
  }

  onLogin = () => {
    validations
      .validateForm(this.state.loginCredential)
      .then((formValidationResult) => {
        business.onLogin(this.state.loginCredential);
        this.setState(business.updateFormErrors(formValidationResult));
      });
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
