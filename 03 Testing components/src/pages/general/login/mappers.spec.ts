import { expect } from 'chai';
import { LoginCredential, createEmptyLoginCredential } from './viewModel';
import { mapLoginCredentialVmToModel } from './mappers';

describe('login mappers', () => {
  describe('mapLoginCredentialVmToModel', () => {
    it('should be a function', () => {
      // Assert
      expect(mapLoginCredentialVmToModel).to.be.a('function');
    });

    it('should return null when passing undefined', () => {
      // Arrange
      const loginCredential = undefined;

      // Act
      const result = mapLoginCredentialVmToModel(loginCredential);

      // Assert
      expect(result).to.be.null;
    });

    it('should return null when passing null', () => {
      // Arrange
      const loginCredential = null;

      // Act
      const result = mapLoginCredentialVmToModel(loginCredential);

      // Assert
      expect(result).to.be.null;
    });

    it('should return empty values when passing emtpy values', () => {
      // Arrange
      const loginCredential = createEmptyLoginCredential();

      // Act
      const result = mapLoginCredentialVmToModel(loginCredential);

      // Assert
      expect(result).to.be.deep.equal(loginCredential);
    });

    it('should return same values when passing values', () => {
      // Arrange
      const loginCredential: LoginCredential = {
        login: 'login',
        password: 'password',
      };

      // Act
      const result = mapLoginCredentialVmToModel(loginCredential);

      // Assert
      expect(result).to.be.deep.equal(loginCredential);
    });
  });
});
