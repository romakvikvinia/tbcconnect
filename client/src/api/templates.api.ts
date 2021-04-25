import { jsonRequest } from '../helper/api.request.helper';
import { baseUrl } from '../helper/baseUrl';
import { ITemplate } from '../interfaces/template.interface';

export const fetchTemplates = () => jsonRequest(`${baseUrl}`, false, {});

export const fetchCreateTemplate = ({ title, description, body, json }: ITemplate) =>
  jsonRequest(`${baseUrl}/templates`, true, { title, description, body, json }, 'POST');
