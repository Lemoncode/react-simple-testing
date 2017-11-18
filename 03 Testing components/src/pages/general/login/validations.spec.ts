import { expect } from 'chai';
import { validations } from './validations';

describe('login validations', () => {
  it('should not to be undefined', () => {
    // Assert
    expect(validations).not.to.be.undefined;
  });

  it('should not have a wrongField field with validator', (done) => {
    // Arrange
    const vm = {
      wrongField: '',
    };
    const field = 'wrongField';
    const value = undefined;

    // Act
    validations.validateField(vm, field, value)
      .then((fieldValidationResult) => {
        // Assert
        expect(fieldValidationResult).to.be.undefined;
      })
      .then(done, done);
  });

  it('should have a login field with required validator that return false when value is undefined', (done) => {
    // Arrange
    const vm = {
      login: '',
    };
    const field = 'login';
    const value = undefined;

    // Act
    validations.validateField(vm, field, value)
      .then((fieldValidationResult) => {
        // Assert
        expect(fieldValidationResult.succeeded).to.be.false;
      })
      .then(done, done);
  });

  it('should have a login field with required validator that return false when value is null', (done) => {
    // Arrange
    const vm = {
      login: '',
    };
    const field = 'login';
    const value = null;

    // Act
    validations.validateField(vm, field, value)
      .then((fieldValidationResult) => {
        // Assert
        expect(fieldValidationResult.succeeded).to.be.false;
      })
      .then(done, done);
  });

  it('should have a login field with required validator that return false when value is empty', (done) => {
    // Arrange
    const vm = {
      login: '',
    };
    const field = 'login';
    const value = '';

    // Act
    validations.validateField(vm, field, value)
      .then((fieldValidationResult) => {
        // Assert
        expect(fieldValidationResult.succeeded).to.be.false;
      })
      .then(done, done);
  });

  it('should have a login field with required validator that return true when value has some value', (done) => {
    // Arrange
    const vm = {
      login: '',
    };
    const field = 'login';
    const value = 'test';

    // Act
    validations.validateField(vm, field, value)
      .then((fieldValidationResult) => {
        // Assert
        expect(fieldValidationResult.succeeded).to.be.true;
      })
      .then(done, done);
  });

  it('should have a password field with required validator that return false when value is undefined', (done) => {
    // Arrange
    const vm = {
      password: '',
    };
    const field = 'password';
    const value = undefined;

    // Act
    validations.validateField(vm, field, value)
      .then((fieldValidationResult) => {
        // Assert
        expect(fieldValidationResult.succeeded).to.be.false;
      })
      .then(done, done);
  });

  it('should have a password field with required validator that return false when value is null', (done) => {
    // Arrange
    const vm = {
      password: '',
    };
    const field = 'password';
    const value = null;

    // Act
    validations.validateField(vm, field, value)
      .then((fieldValidationResult) => {
        // Assert
        expect(fieldValidationResult.succeeded).to.be.false;
      })
      .then(done, done);
  });

  it('should have a password field with required validator that return false when value is empty', (done) => {
    // Arrange
    const vm = {
      password: '',
    };
    const field = 'password';
    const value = '';

    // Act
    validations.validateField(vm, field, value)
      .then((fieldValidationResult) => {
        // Assert
        expect(fieldValidationResult.succeeded).to.be.false;
      })
      .then(done, done);
  });

  it('should have a password field with required validator that return true when value has some value', (done) => {
    // Arrange
    const vm = {
      password: '',
    };
    const field = 'password';
    const value = 'test';

    // Act
    validations.validateField(vm, field, value)
      .then((fieldValidationResult) => {
        // Assert
        expect(fieldValidationResult.succeeded).to.be.true;
      })
      .then(done, done);
  });
});
