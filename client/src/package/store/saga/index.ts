import { all, call } from 'redux-saga/effects';
import useSaga from './user.saga';
import templateSaga from './template.saga';

function* rootSaga() {
  yield all([call(useSaga), call(templateSaga)]);
}

export default rootSaga;
