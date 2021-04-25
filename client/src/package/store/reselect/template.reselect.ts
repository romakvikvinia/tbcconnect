import { createSelector } from 'reselect';
import { RootState } from '../reducers';
import { ITemplatesState } from '../reducers/template.reducer';

const selectTemplate = (state: RootState): ITemplatesState => state.template;

export const reselectTemplate = createSelector(selectTemplate, ({ isLoading, items }) => ({
  isLoading,
  items,
}));
