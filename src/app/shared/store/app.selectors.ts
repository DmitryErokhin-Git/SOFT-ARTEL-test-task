import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from './';

export const appFeatureSelector = createFeatureSelector<AppState>('app');
export const appStateSelector = createSelector(
  appFeatureSelector,
  (state: AppState) => state
);
