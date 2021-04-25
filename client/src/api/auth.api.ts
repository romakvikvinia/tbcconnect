import { jsonRequest } from '../helper/api.request.helper';
import { baseUrl } from '../helper/baseUrl';
import { IAuthCredentials } from '../interfaces/auth.interface';

export const fetchLogin = ({ username, password }: IAuthCredentials) =>
  jsonRequest(`${baseUrl}/auth/signin`, false, { username, password }, 'POST');
