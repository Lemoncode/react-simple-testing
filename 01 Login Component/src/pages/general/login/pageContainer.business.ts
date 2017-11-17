import { FieldValidationResult, FormValidationResult } from 'lc-form-validation';
import * as toastr from 'toastr';
import { LoginCredential, LoginCredentialError, createEmptyLoginCredential } from './viewModel';
import { State } from './pageContainer.state';
import { history } from '../../../history';
import { adminRoutes } from '../../../common/constants/routes/admin';

export const onUpdateField = (field: string, value: string, fieldValidationResult: FieldValidationResult) =>
  (state: State): State => ({
    ...state,
    loginCredential: {
      ...state.loginCredential,
      [field]: value,
    },
    loginCredentialError: {
      ...state.loginCredentialError,
      [field]: fieldValidationResult,
    },
  });

export const onLogin = (formValidationResult: FormValidationResult) =>
  (state: State): State => {
    toastr.remove();
    if (isValidLogin(state.loginCredential)) {
      toastr.success('Login success');
      history.push(adminRoutes.memberList);
    } else {
      toastr.error('Login fail');
    }
    return updateFormErrors(state, formValidationResult);
  };

// TODO: Move to api
const isValidLogin = (loginCredential: LoginCredential) => (
  loginCredential.login === 'admin' &&
  loginCredential.password === 'test'
);

const updateFormErrors = (state: State, formValidationResult: FormValidationResult): State => ({
  ...state,
  loginCredentialError: getFieldValidationResult(state, formValidationResult),
});

const getFieldValidationResult = (state: State, formValidationResult: FormValidationResult) => (
  formValidationResult.fieldErrors.reduce((errors, fieldValidationResult) => ({
    ...errors,
    [fieldValidationResult.key]: fieldValidationResult,
  }), state.loginCredentialError)
);
