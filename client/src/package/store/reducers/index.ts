import { combineReducers } from 'redux';
import TestReducer from './test.reducer';

const rootReducer = combineReducers({
  test: TestReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
