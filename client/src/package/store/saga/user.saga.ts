import { takeEvery, call, all, put } from 'redux-saga/effects';
import {
  clearUserCredentials,
  IStartFetchUserCredentials,
  setUserCredentials,
  setUserCredentialsLoader,
} from '../actions/user.action';
import { START_FETCH_LOGOUT, START_FETCH_USER_CREDENTIALS } from '../const/user.const';

// actions

//api

function* startUserFetchAsync({ payload: { token, expiresIn } }: IStartFetchUserCredentials) {
  try {
    yield put(setUserCredentialsLoader(true));
    yield localStorage.setItem('tbc_connect_token', token);
    yield put(setUserCredentials({ token, expiresIn }));
  } catch (error) {
    yield put(setUserCredentialsLoader(false));
  }
}

function* onStartUserFetch() {
  yield takeEvery(START_FETCH_USER_CREDENTIALS, startUserFetchAsync);
}

function* StartFetchLogOutAsync(action: any) {
  try {
    yield put(setUserCredentialsLoader(true));
    yield localStorage.removeItem('tbc_connect_token');
    yield put(clearUserCredentials());
  } catch (error) {
    yield put(setUserCredentialsLoader(false));
  }
}

function* onStartFetchLogOut() {
  yield takeEvery(START_FETCH_LOGOUT, StartFetchLogOutAsync);
}

export default function* userSaga() {
  yield all([call(onStartUserFetch), call(onStartFetchLogOut)]);
}
