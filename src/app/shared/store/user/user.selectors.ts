import {UserState} from './';
import {createFeatureSelector, createSelector} from "@ngrx/store";

export const userStateFeatureSelector = createFeatureSelector<UserState>('userState');
export const userSelector = createSelector(
  userStateFeatureSelector,
  (state: UserState) => state.user
);
