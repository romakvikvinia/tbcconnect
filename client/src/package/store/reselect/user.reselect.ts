import { createSelector } from 'reselect';
import { RootState } from '../reducers';
import { IUserState } from '../reducers/user.reducer';

const selectUser = (state: RootState): IUserState => state.user;

export const reselectUser = createSelector(selectUser, ({ isLoading, isAuthenticated, token }) => ({
  isLoading,
  isAuthenticated,
  token,
}));
