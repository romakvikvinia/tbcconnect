import { all, call } from 'redux-saga/effects';
import testSaga from './test.saga';

function* rootSaga() {
  yield all([call(testSaga)]);
}

export default rootSaga;
