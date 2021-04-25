import { jsonRequest } from '../helper/api.request.helper';
import { baseUrl } from '../helper/baseUrl';
import { ITemplate } from '../interfaces/template.interface';

export const fetchTemplates = () => jsonRequest(`${baseUrl}/templates`, false, null);

export const fetchCreateTemplate = ({ title, description, body, json }: ITemplate) =>
  jsonRequest(`${baseUrl}/templates`, true, { title, description, body, json }, 'POST');

export const fetchTemplate = (id: string) => jsonRequest(`${baseUrl}/templates/${id}`, false, null);

export const fetchDeleteTemplate = (id: string) => jsonRequest(`${baseUrl}/templates/${id}`, true, null, 'DELETE');
