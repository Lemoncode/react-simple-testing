import { FieldValidationResult, FormValidationResult } from 'lc-form-validation';
import * as toastr from 'toastr';
import { LoginCredential, LoginCredentialError, createEmptyLoginCredential } from './viewModel';
import { State } from './pageContainer.state';
import { history } from '../../../history';
import { adminRoutes } from '../../../common/constants/routes/admin';
import { login } from '../../../rest-api/api/general';
import { mapLoginCredentialVmToModel } from './mappers';

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

    const loginCredentialModel = mapLoginCredentialVmToModel(state.loginCredential);
    login(loginCredentialModel)
      .then(() => {
        toastr.success('Login success');
        history.push(adminRoutes.memberList);
      })
      .catch((error) => {
        toastr.error(error);
      });

    return updateFormErrors(state, formValidationResult);
  };

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
