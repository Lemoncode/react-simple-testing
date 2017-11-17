import * as model from '../../../rest-api/model/general';
import * as vm from './viewModel';

export const mapLoginCredentialVmToModel = (logingCredential: vm.LoginCredential): model.LoginCredential => ({
  ...logingCredential,
});
