import { IAuthToken } from '../../../interfaces/auth.interface';
import {
  CLEAR_USER_CREDENTIALS,
  SET_USER_CREDENTIALS,
  SET_USER_CREDENTIALS_LOADER,
  START_FETCH_LOGOUT,
  START_FETCH_USER_CREDENTIALS,
} from '../const/user.const';

export interface IStartFetchUserCredentials {
  type: typeof START_FETCH_USER_CREDENTIALS;
  payload: IAuthToken;
}

export const startFetchUserCredentials = (payload: IAuthToken): IStartFetchUserCredentials => ({
  type: START_FETCH_USER_CREDENTIALS,
  payload,
});

export interface ISetUserCredentials {
  type: typeof SET_USER_CREDENTIALS;
  payload: IAuthToken;
}
export const setUserCredentials = (payload: IAuthToken): ISetUserCredentials => ({
  type: SET_USER_CREDENTIALS,
  payload,
});

export interface ISetUserCredentialsLoader {
  type: typeof SET_USER_CREDENTIALS_LOADER;
  payload: boolean;
}
export const setUserCredentialsLoader = (payload: boolean): ISetUserCredentialsLoader => ({
  type: SET_USER_CREDENTIALS_LOADER,
  payload,
});

export const startFetchLogOut = () => ({
  type: START_FETCH_LOGOUT,
});

export interface IClearUserCredentials {
  type: typeof CLEAR_USER_CREDENTIALS;
}
export const clearUserCredentials = (): IClearUserCredentials => ({
  type: CLEAR_USER_CREDENTIALS,
});
