import { expect } from 'chai';
import * as deepFreeze from 'deep-freeze';
import { FieldValidationResult, FormValidationResult } from 'lc-form-validation';
import * as toastr from 'toastr';
import {
  LoginCredential, createEmptyLoginCredential,
  LoginCredentialError, createEmptyLoginCredentialError,
} from './viewModel';
import * as mappers from './mappers';
import * as api from '../../../rest-api/api/general';
import { history } from '../../../history';
import { adminRoutes } from '../../../common/constants/routes/admin';
import { onUpdateField, onLogin, updateFormErrors } from './pageContainer.business';

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

  describe('onLogin', () => {
    it('should be a function', () => {
      // Assert
      expect(onLogin).to.be.a('function');
    });

    it('should call to toastr.remove', sinon.test(function() {
      // Arrange
      const sinon: sinon.SinonStatic = this;

      const loginCredential = createEmptyLoginCredential();
      const removeStub = sinon.stub(toastr, 'remove');
      const mapLoginCredentialVmToModelStub = sinon.stub(mappers, 'mapLoginCredentialVmToModel');
      const loginStub = sinon.stub(api, 'login')
        .returns({
          then: function() {
            return this;
          },
          catch: function() {
            return this;
          },
        });

      // Act
      onLogin(loginCredential);

      // Assert
      expect(removeStub.calledOnce).to.be.true;
    }));

    it('should call to mapLoginCredentialVmToModel', sinon.test(function() {
      // Arrange
      const sinon: sinon.SinonStatic = this;

      const loginCredential = createEmptyLoginCredential();
      const removeStub = sinon.stub(toastr, 'remove');
      const mapLoginCredentialVmToModelStub = sinon.stub(mappers, 'mapLoginCredentialVmToModel');
      const loginStub = sinon.stub(api, 'login')
        .returns({
          then: function() {
            return this;
          },
          catch: function() {
            return this;
          },
        });

      // Act
      onLogin(loginCredential);

      // Assert
      expect(mapLoginCredentialVmToModelStub.calledOnce).to.be.true;
    }));

    it('should call to login with loginCredentialModel', sinon.test(function() {
      // Arrange
      const sinon: sinon.SinonStatic = this;

      const loginCredential = createEmptyLoginCredential();
      const removeStub = sinon.stub(toastr, 'remove');
      const loginCredentialModel = {
        login: 'test',
        password: 'test',
      };
      const mapLoginCredentialVmToModelStub = sinon.stub(mappers, 'mapLoginCredentialVmToModel')
        .returns(loginCredentialModel);

      const loginStub = sinon.stub(api, 'login')
        .returns({
          then: function() {
            return this;
          },
          catch: function() {
            return this;
          },
        });

      // Act
      onLogin(loginCredential);

      // Assert
      expect(loginStub.calledOnce).to.be.true;
      expect(loginStub.calledWith(loginCredentialModel)).to.be.true;
    }));

    it('should call to toastr.success and history.push when promise resolved', sinon.test(function() {
      // Arrange
      const sinon: sinon.SinonStatic = this;

      const loginCredential = createEmptyLoginCredential();
      const removeStub = sinon.stub(toastr, 'remove');
      const loginCredentialModel = {
        login: 'test',
        password: 'test',
      };
      const mapLoginCredentialVmToModelStub = sinon.stub(mappers, 'mapLoginCredentialVmToModel')
        .returns(loginCredentialModel);

      const loginStub = sinon.stub(api, 'login')
        .returns({
          then: function(callback) {
            callback();
            return this;
          },
          catch: function() {
            return this;
          },
        });

      const successStub = sinon.stub(toastr, 'success');
      const pushStub = sinon.stub(history, 'push');

      // Act
      onLogin(loginCredential);

      // Assert
      expect(successStub.calledOnce).to.be.true;
      expect(successStub.calledWith('Login success')).to.be.true;
      expect(pushStub.calledOnce).to.be.true;
      expect(pushStub.calledWith(adminRoutes.memberList)).to.be.true;
    }));
  });

  describe('updateFormErrors', () => {
    it('should be a function', () => {
      // Assert
      expect(updateFormErrors).to.be.a('function');
    });

    it('should not mutate the original state and does not update the values passing empty fieldErrors', () => {
      // Arrange
      const originalState = {
        loginCredential: createEmptyLoginCredential(),
        loginCredentialError: createEmptyLoginCredentialError(),
      };

      const formValidationResult = new FormValidationResult();
      formValidationResult.fieldErrors = [];

      deepFreeze(originalState);

      // Act
      const newState = updateFormErrors(formValidationResult)(originalState);

      // Assert
      expect(newState.loginCredential.login).to.be.equal(originalState.loginCredential.login);
      expect(newState.loginCredential.password).to.be.equal(originalState.loginCredential.password);

      expect(newState.loginCredentialError.login).to.be.equal(originalState.loginCredentialError.login);
      expect(newState.loginCredentialError.password).to.be.equal(originalState.loginCredentialError.password);
    });

    it(`should not mutate the original state and does not update the values
    passing one fieldError with undefined field`, () => {
        // Arrange
        const originalState = {
          loginCredential: createEmptyLoginCredential(),
          loginCredentialError: createEmptyLoginCredentialError(),
        };

        const formValidationResult = new FormValidationResult();
        formValidationResult.fieldErrors = [
          {
            key: undefined,
            errorMessage: 'test error message',
            succeeded: false,
            type: '',
          },
        ];

        deepFreeze(originalState);

        // Act
        const newState = updateFormErrors(formValidationResult)(originalState);

        // Assert
        expect(newState.loginCredential.login).to.be.equal(originalState.loginCredential.login);
        expect(newState.loginCredential.password).to.be.equal(originalState.loginCredential.password);

        expect(newState.loginCredentialError.login).to.be.equal(originalState.loginCredentialError.login);
        expect(newState.loginCredentialError.password).to.be.equal(originalState.loginCredentialError.password);
      });

    it(`should not mutate the original state and does not update the values
    passing one fieldError with null field`, () => {
        // Arrange
        const originalState = {
          loginCredential: createEmptyLoginCredential(),
          loginCredentialError: createEmptyLoginCredentialError(),
        };

        const formValidationResult = new FormValidationResult();
        formValidationResult.fieldErrors = [
          {
            key: null,
            errorMessage: 'test error message',
            succeeded: false,
            type: '',
          },
        ];

        deepFreeze(originalState);

        // Act
        const newState = updateFormErrors(formValidationResult)(originalState);

        // Assert
        expect(newState.loginCredential.login).to.be.equal(originalState.loginCredential.login);
        expect(newState.loginCredential.password).to.be.equal(originalState.loginCredential.password);

        expect(newState.loginCredentialError.login).to.be.equal(originalState.loginCredentialError.login);
        expect(newState.loginCredentialError.password).to.be.equal(originalState.loginCredentialError.password);
      });

    it(`should not mutate the original state and updates the values
    passing one fieldError with login field`, () => {
        // Arrange
        const originalState = {
          loginCredential: createEmptyLoginCredential(),
          loginCredentialError: createEmptyLoginCredentialError(),
        };

        const formValidationResult = new FormValidationResult();
        formValidationResult.fieldErrors = [
          {
            key: 'login',
            errorMessage: 'test login error message',
            succeeded: false,
            type: '',
          },
        ];

        deepFreeze(originalState);

        // Act
        const newState = updateFormErrors(formValidationResult)(originalState);

        // Assert
        expect(newState.loginCredential.login).to.be.equal(originalState.loginCredential.login);
        expect(newState.loginCredential.password).to.be.equal(originalState.loginCredential.password);

        expect(newState.loginCredentialError.login.errorMessage).to.be.equal('test login error message');
        expect(newState.loginCredentialError.login.succeeded).to.be.false;
        expect(newState.loginCredentialError.password).to.be.equal(originalState.loginCredentialError.password);
      });

    it(`should not mutate the original state and updates the values
    passing two fieldErrors with login and password fields`, () => {
        // Arrange
        const originalState = {
          loginCredential: createEmptyLoginCredential(),
          loginCredentialError: createEmptyLoginCredentialError(),
        };

        const formValidationResult = new FormValidationResult();
        formValidationResult.fieldErrors = [
          {
            key: 'login',
            errorMessage: 'test login error message',
            succeeded: false,
            type: '',
          },
          {
            key: 'password',
            errorMessage: 'test password error message',
            succeeded: true,
            type: '',
          },
        ];

        deepFreeze(originalState);

        // Act
        const newState = updateFormErrors(formValidationResult)(originalState);

        // Assert
        expect(newState.loginCredential.login).to.be.equal(originalState.loginCredential.login);
        expect(newState.loginCredential.password).to.be.equal(originalState.loginCredential.password);

        expect(newState.loginCredentialError.login.errorMessage).to.be.equal('test login error message');
        expect(newState.loginCredentialError.login.succeeded).to.be.false;
        expect(newState.loginCredentialError.password.errorMessage).to.be.equal('test password error message');
        expect(newState.loginCredentialError.password.succeeded).to.be.true;
      });
  });
});
