import { LoginCredential } from '../../../model/general';
import { Login } from './contract';

// TODO: Implement real
export const login: Login = (loginCredential: LoginCredential): Promise<boolean> => (
  Promise.resolve(true)
);
