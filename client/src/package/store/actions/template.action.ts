import {
  SET_DELETE_TEMPLATE,
  SET_TEMPLATES,
  SET_TEMPLATES_LOADER,
  START_DELETE_TEMPLATE,
  START_FETCH_TEMPLATES,
} from '../const';
import { ITemplate } from '../reducers/template.reducer';

/**
 * fetch templates related actions
 */
export interface IStartFetchTemplates {
  type: typeof START_FETCH_TEMPLATES;
}
export const startFetchTemplates = (): IStartFetchTemplates => ({
  type: START_FETCH_TEMPLATES,
});

export interface ISetTemplatesLoader {
  type: typeof SET_TEMPLATES_LOADER;
  payload: boolean;
}
export const setTemplatesLoader = (payload: boolean): ISetTemplatesLoader => ({
  type: SET_TEMPLATES_LOADER,
  payload,
});
export interface ISetTemplates {
  type: typeof SET_TEMPLATES;
  payload: ITemplate[];
}
export const setTemplates = (payload: ITemplate[]): ISetTemplates => ({
  type: SET_TEMPLATES,
  payload,
});

/**
 * delete templates related actions
 */
export interface IStartFetchDeleteTemplate {
  type: typeof START_DELETE_TEMPLATE;
  payload: string;
}
export const startFetchDeleteTemplate = (payload: string): IStartFetchDeleteTemplate => ({
  type: START_DELETE_TEMPLATE,
  payload,
});
export interface ISetDeleteItem {
  type: typeof SET_DELETE_TEMPLATE;
  payload: string;
}
export const setDeleteItem = (payload: string): ISetDeleteItem => ({
  type: SET_DELETE_TEMPLATE,
  payload,
});
