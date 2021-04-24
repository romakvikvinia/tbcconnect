import { jsonRequest } from '../helper/api.request.helper';
import { baseUrl } from '../helper/baseUrl';

export const fetchLogin = () => jsonRequest(`${baseUrl}`, false, {});
