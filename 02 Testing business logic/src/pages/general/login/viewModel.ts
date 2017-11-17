import { FieldValidationResult } from 'lc-form-validation';

export interface LoginCredential {
  login: string;
  password: string;
}

export const createEmptyLoginCredential = (): LoginCredential => ({
  login: '',
  password: '',
});

export interface LoginCredentialError {
  login: FieldValidationResult;
  password: FieldValidationResult;
}

export const createEmptyLoginCredentialError = (): LoginCredentialError => ({
  login: new FieldValidationResult(),
  password: new FieldValidationResult(),
});
