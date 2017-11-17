import { expect } from 'chai';
import * as deepFreeze from 'deep-freeze';
import { FieldValidationResult } from 'lc-form-validation';
import {
  LoginCredential, createEmptyLoginCredential,
  LoginCredentialError, createEmptyLoginCredentialError,
} from './viewModel';
import { onUpdateField, onLogin } from './pageContainer.business';

describe('login pageContainer business', () => {
  describe('onUpdateField', () => {
    it('should be a function', () => {
      // Assert
      expect(onUpdateField).to.be.a('function');
    });

    it('should not mutate the original state and does not update the values passing field equals undefined', () => {
      // Arrange
      const originalState = {
        loginCredential: createEmptyLoginCredential(),
        loginCredentialError: createEmptyLoginCredentialError(),
      };

      const field = undefined;
      const value = undefined;
      const fieldValidationResult = undefined;

      deepFreeze(originalState);

      // Act
      const newState = onUpdateField(field, value, fieldValidationResult)(originalState);

      // Assert
      expect(newState.loginCredential.login).to.be.equal(originalState.loginCredential.login);
      expect(newState.loginCredential.password).to.be.equal(originalState.loginCredential.password);

      expect(newState.loginCredentialError.login).to.be.equal(originalState.loginCredentialError.login);
      expect(newState.loginCredentialError.password).to.be.equal(originalState.loginCredentialError.password);
    });

    it('should not mutate the original state and does not update the values passing field equals null', () => {
      // Arrange
      const originalState = {
        loginCredential: createEmptyLoginCredential(),
        loginCredentialError: createEmptyLoginCredentialError(),
      };

      const field = null;
      const value = null;
      const fieldValidationResult = null;

      deepFreeze(originalState);

      // Act
      const newState = onUpdateField(field, value, fieldValidationResult)(originalState);

      // Assert
      expect(newState.loginCredential.login).to.be.equal(originalState.loginCredential.login);
      expect(newState.loginCredential.password).to.be.equal(originalState.loginCredential.password);

      expect(newState.loginCredentialError.login).to.be.equal(originalState.loginCredentialError.login);
      expect(newState.loginCredentialError.password).to.be.equal(originalState.loginCredentialError.password);
    });

    it('should not mutate the original state and does not update the values passing wrong field', () => {
      // Arrange
      const originalState = {
        loginCredential: createEmptyLoginCredential(),
        loginCredentialError: createEmptyLoginCredentialError(),
      };

      const field = 'wrongField';
      const value = 'test';
      const fieldValidationResult = new FieldValidationResult();

      deepFreeze(originalState);

      // Act
      const newState = onUpdateField(field, value, fieldValidationResult)(originalState);

      // Assert
      expect(newState.loginCredential.login).to.be.equal(originalState.loginCredential.login);
      expect(newState.loginCredential.password).to.be.equal(originalState.loginCredential.password);

      expect(newState.loginCredentialError.login).to.be.equal(originalState.loginCredentialError.login);
      expect(newState.loginCredentialError.password).to.be.equal(originalState.loginCredentialError.password);
    });

    it('should not mutate the original state but updates the values passing login field and field errors', () => {
      // Arrange
      const originalState = {
        loginCredential: createEmptyLoginCredential(),
        loginCredentialError: createEmptyLoginCredentialError(),
      };

      const field = 'login';
      const value = 'test login';
      const fieldValidationResult = new FieldValidationResult();
      fieldValidationResult.errorMessage = 'test login error message';
      fieldValidationResult.succeeded = false;

      deepFreeze(originalState);

      // Act
      const newState = onUpdateField(field, value, fieldValidationResult)(originalState);

      // Assert
      expect(newState.loginCredential.login).to.be.equal('test login');
      expect(newState.loginCredential.password).to.be.empty;

      expect(newState.loginCredentialError.login.errorMessage).to.be.equal('test login error message');
      expect(newState.loginCredentialError.login.succeeded).to.be.false;
      expect(newState.loginCredentialError.password).to.be.deep.equal(new FieldValidationResult());
    });

    it('should not mutate the original state but updates the values passing password field and field errors', () => {
      // Arrange
      const originalState = {
        loginCredential: createEmptyLoginCredential(),
        loginCredentialError: createEmptyLoginCredentialError(),
      };

      const field = 'password';
      const value = 'test password';
      const fieldValidationResult = new FieldValidationResult();
      fieldValidationResult.errorMessage = 'test password error message';
      fieldValidationResult.succeeded = false;

      deepFreeze(originalState);

      // Act
      const newState = onUpdateField(field, value, fieldValidationResult)(originalState);

      // Assert
      expect(newState.loginCredential.password).to.be.equal('test password');
      expect(newState.loginCredential.login).to.be.empty;

      expect(newState.loginCredentialError.password.errorMessage).to.be.equal('test password error message');
      expect(newState.loginCredentialError.password.succeeded).to.be.false;
      expect(newState.loginCredentialError.login).to.be.deep.equal(new FieldValidationResult());
    });
  });
});
