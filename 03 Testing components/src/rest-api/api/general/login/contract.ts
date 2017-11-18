import { LoginCredential } from '../../../model/general';

export type Login = (loginCredential: LoginCredential) => Promise<boolean>;
