import { Login } from './contract';
import * as double from './double';
import * as real from './real';
import { config } from '../config';

export const login: Login = config.useRealAPI ?
  real.login :
  double.login;
