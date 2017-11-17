import * as React from 'react';
import { Input, Button } from '../../../../common/components/form';
import { LoginCredential, LoginCredentialError } from '../viewModel';

interface Props {
  loginCredential: LoginCredential;
  loginCredentialError: LoginCredentialError;
  onUpdateField(field: string, value: string): void;
  onLogin(): void;
}

export const FormComponent: React.StatelessComponent<Props> = (props) => (
  <div className="panel-body">
    <form role="form">
      <Input
        type="text"
        label="Login"
        placeholder="Login"
        name="login"
        value={props.loginCredential.login}
        onChange={props.onUpdateField}
        error={
          props.loginCredentialError.login.succeeded ?
            '' :
            props.loginCredentialError.login.errorMessage
        }
      />
      <Input
        type="password"
        label="Password"
        placeholder="Password"
        name="password"
        value={props.loginCredential.password}
        onChange={props.onUpdateField}
        error={
          props.loginCredentialError.password.succeeded ?
            '' :
            props.loginCredentialError.password.errorMessage
        }
      />
      <Button
        type="submit"
        label="Login"
        onClick={props.onLogin}
      />
    </form>
  </div>
);
