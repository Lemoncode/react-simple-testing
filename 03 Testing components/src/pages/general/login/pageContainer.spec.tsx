import * as React from 'react';
import { shallow } from 'enzyme';
import { FieldValidationResult, FormValidationResult } from 'lc-form-validation';
import { validations } from './validations';
import * as business from './pageContainer.business';
import { createEmptyLoginCredential } from './viewModel';
import { LoginPageContainer } from './pageContainer';

describe('LoginPageContainer', () => {
  describe('onUpdateField', () => {
    it('should call to validations.validateField and business.onUpdateField when call onUpdateField property',
      sinon.test(function() {
        // Arrange
        const sinon: sinon.SinonStatic = this;

        const expectedLoginCredential = createEmptyLoginCredential();
        const expectedField = 'test field';
        const expectedValue = 'test value';
        const expectedFieldValidationResult = new FieldValidationResult();

        const validateFieldStub = sinon.stub(validations, 'validateField')
          .returns({
            then: function(callback) {
              callback(expectedFieldValidationResult);
              return this;
            },
          });
        const onUpdateFieldStub = sinon.stub(business, 'onUpdateField');

        // Act
        const component = shallow(
          <LoginPageContainer />,
        );

        component.prop('onUpdateField')(expectedField, expectedValue);

        // Assert
        expect(validateFieldStub.calledOnce).to.be.true;
        expect(validateFieldStub.calledWith(expectedLoginCredential, expectedField, expectedValue)).to.be.true;

        expect(onUpdateFieldStub.calledOnce).to.be.true;
        expect(onUpdateFieldStub.calledWith(expectedField, expectedValue, expectedFieldValidationResult)).to.be.true;
      }));
  });

  describe('onLogin', () => {
    it('should call to validations.validateFrom, business onLogin and updateFormErrors when call onLogin property',
      sinon.test(function() {
        // Arrange
        const sinon: sinon.SinonStatic = this;

        const expectedLoginCredential = createEmptyLoginCredential();
        const expectedFormValidationResult = new FormValidationResult();

        const validateFormStub = sinon.stub(validations, 'validateForm')
          .returns({
            then: function(callback) {
              callback(expectedFormValidationResult);
              return this;
            },
          });
        const onLoginStub = sinon.stub(business, 'onLogin');
        const updateFormErrorsStub = sinon.stub(business, 'updateFormErrors');

        // Act
        const component = shallow(
          <LoginPageContainer />,
        );

        component.prop('onLogin')();

        // Assert
        expect(validateFormStub.calledOnce).to.be.true;
        expect(validateFormStub.calledWith(expectedLoginCredential)).to.be.true;

        expect(onLoginStub.calledOnce).to.be.true;
        expect(onLoginStub.calledWith(expectedLoginCredential)).to.be.true;

        expect(updateFormErrorsStub.calledOnce).to.be.true;
        expect(updateFormErrorsStub.calledWith(expectedFormValidationResult)).to.be.true;
      }));
  });
});
