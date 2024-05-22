import {createAction, props} from '@ngrx/store';
import {ConfigState} from "./";

export const loadConfigAction = createAction(
  '[Config] Load config',
);

export const loadConfigSuccessAction = createAction(
  '[Config] Load config SUCCESS',
  props<ConfigState>()
);

export const loadConfigFailureAction = createAction(
  '[Config] Load config FAILURE',
  (error: any) => ({error}),
);
