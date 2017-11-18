import { LoginCredential } from '../../../model/general';
import { Login } from './contract';

export const login: Login = (loginCredential: LoginCredential): Promise<boolean> => (
  isValidLogin(loginCredential) ?
    Promise.resolve(true) :
    Promise.reject('Login Fail')
);

const isValidLogin = (loginCredential: LoginCredential) => (
  loginCredential.login === 'admin' &&
  loginCredential.password === 'test'
);
