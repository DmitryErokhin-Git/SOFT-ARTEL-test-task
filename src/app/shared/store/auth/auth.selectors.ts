import {AuthState} from './auth.interface';
import {createFeatureSelector, createSelector} from "@ngrx/store";

export const authStateFeatureSelector = createFeatureSelector<AuthState>('authState');
export const isAuthenticatedSelector = createSelector(
  authStateFeatureSelector,
  (state: AuthState) => state.isAuthenticated
);
