import {ConfigState} from './';
import {createFeatureSelector, createSelector} from "@ngrx/store";

export const configStateFeatureSelector = createFeatureSelector<ConfigState>('configState');
export const configSelector = createSelector(
  configStateFeatureSelector,
  (state: ConfigState) => state.config
);
