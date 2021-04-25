import { combineReducers } from 'redux';
import UserReducer from './user.reducer';
import TemplateReducer from './template.reducer';

const rootReducer = combineReducers({
  user: UserReducer,
  template: TemplateReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
