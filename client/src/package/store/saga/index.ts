import { all, call } from 'redux-saga/effects';
import useSaga from './user.saga';

function* rootSaga() {
  yield all([call(useSaga)]);
}

export default rootSaga;
