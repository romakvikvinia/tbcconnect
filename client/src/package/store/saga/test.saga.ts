import { takeEvery, call, all, put } from 'redux-saga/effects';

// actions

//api

function* startTestFetch(actions: any) {
  try {
  } catch (error) {}
}

function* onStartTestFetch() {
  yield takeEvery('', startTestFetch);
}

export default function* testSaga() {
  yield all([call(onStartTestFetch)]);
}
