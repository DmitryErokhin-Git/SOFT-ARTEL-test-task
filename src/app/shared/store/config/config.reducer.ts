import {createReducer, on} from '@ngrx/store';
import {ConfigState, loadConfigAction, loadConfigFailureAction, loadConfigSuccessAction,} from './';
import {deleteAllDataAction} from "../app.actions";

const initialState: ConfigState = {
  config: {thead: {columns: []}},
};

export const configReducer = createReducer(
  initialState,
  on(loadConfigAction,
    (state, action) => ({
      ...state,
      type: action.type,
    })),
  on(loadConfigSuccessAction,
    (state, action) => ({
      ...state,
      config: action.config,
      type: action.type,
    })),
  on(loadConfigFailureAction,
    (state, action) => ({
      ...state,
      config: initialState.config,
      error: {...action.error},
      type: action.type,
    })),
  on(deleteAllDataAction,
    (state, action) => ({
      ...state,
      config: initialState.config,
      type: action.type,
    })),
);
