import { LoginCredential, LoginCredentialError } from './viewModel';

export interface State {
  loginCredential: LoginCredential;
  loginCredentialError: LoginCredentialError;
}
