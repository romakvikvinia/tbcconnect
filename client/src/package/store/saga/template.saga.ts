import { takeEvery, call, all, put } from 'redux-saga/effects';
import { fetchTemplates, fetchDeleteTemplate } from '../../../api/templates.api';
import {
  IStartFetchDeleteTemplate,
  IStartFetchTemplates,
  setDeleteItem,
  setTemplates,
  setTemplatesLoader,
} from '../actions/template.action';
import { START_DELETE_TEMPLATE, START_FETCH_TEMPLATES } from '../const';

function* startFetchTemplatesAsync(action: IStartFetchTemplates) {
  try {
    yield put(setTemplatesLoader(true));
    //@ts-ignore
    const data = yield fetchTemplates();
    yield put(setTemplates(data));
  } catch (error) {
    yield put(setTemplatesLoader(false));
  }
}

function* onStartFetchTemplates() {
  yield takeEvery(START_FETCH_TEMPLATES, startFetchTemplatesAsync);
}

function* startFetchDeleteTemplateAsync({ payload }: IStartFetchDeleteTemplate) {
  try {
    yield put(setTemplatesLoader(true));
    //@ts-ignore
    yield fetchDeleteTemplate(payload);
    yield put(setDeleteItem(payload));
  } catch (error) {
    yield put(setTemplatesLoader(false));
  }
}

function* onStartFetchDeleteTemplate() {
  yield takeEvery(START_DELETE_TEMPLATE, startFetchDeleteTemplateAsync);
}

export default function* templateSaga() {
  yield all([call(onStartFetchTemplates), call(onStartFetchDeleteTemplate)]);
}
