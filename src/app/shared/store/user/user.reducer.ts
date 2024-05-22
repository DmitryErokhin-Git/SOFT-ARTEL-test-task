import {createReducer, on} from '@ngrx/store';
import {requestUserAction, requestUserFailureAction, requestUserSuccessAction, setUserAction, UserState} from './';
import {deleteAllDataAction} from "../app.actions";

const initialState: UserState = {
  user: {
    id: 0,
    name: '',
    surname: '',
    login: '',
    date: '',
    username: '',
    city: '',
    password: '',
    avatar: new URL('http://localhost:4000/')
  }
};

export const userReducer = createReducer(
  initialState,
  on(requestUserAction, (state, action) => ({
    ...state,
    type: action.type,
  })),
  on(requestUserSuccessAction,
    (state, action) => ({
      ...state,
      user: {...action.user},
      type: action.type,
    })),
  on(requestUserFailureAction,
    (state, action) => ({
      ...state,
      user: initialState.user,
      error: {...action.error},
      type: action.type,
    })),
  on(setUserAction,
    (state, action) => ({
      ...state,
      user: {...action.user},
      type: action.type,
    })),
  on(deleteAllDataAction,
    (state, action) => ({
      ...state,
      user: initialState.user,
      type: action.type,
    })),
);
