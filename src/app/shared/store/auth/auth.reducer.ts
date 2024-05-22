import {createReducer, on} from '@ngrx/store';
import {
  checkAuthAction,
  checkAuthFailureAction,
  checkAuthSuccessAction,
  loginAction,
  loginFailureAction,
  loginSuccessAction,
  logoutAction
} from './auth.actions';
import {AuthState} from './auth.interface';

const initialState: AuthState = {
  isAuthenticated: false,
};

export const authReducer = createReducer(
  initialState,
  on(loginAction, (state, action) => ({
    ...state,
    type: action.type,
  })),
  on(loginSuccessAction, (state, action) => ({
    ...state,
    isAuthenticated: true,
    type: action.type,
  })),
  on(loginFailureAction, (state, action) => ({
    ...state,
    isAuthenticated: false,
    type: action.type,
    error: action.error,
  })),
  on(logoutAction, (state, action) => ({
    ...state,
    isAuthenticated: false,
    type: action.type,
  })),


  on(checkAuthAction, (state, action) => ({
    ...state,
    isAuthenticated: false,
    type: action.type,
  })),
  on(checkAuthSuccessAction, (state, action) => ({
    ...state,
    isAuthenticated: true,
    type: action.type,
  })),
  on(checkAuthFailureAction, (state, action) => ({
    ...state,
    isAuthenticated: false,
    type: action.type,
    error: action.error,
  })),
);
