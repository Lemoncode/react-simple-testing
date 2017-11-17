import * as model from '../../../rest-api/model/general';
import * as vm from './viewModel';

export const mapLoginCredentialVmToModel = (loginCredential: vm.LoginCredential): model.LoginCredential => ({
  ...loginCredential,
});
