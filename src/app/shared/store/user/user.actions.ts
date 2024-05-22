import {createAction, props} from '@ngrx/store';
import {UserState} from "./";

export const requestUserAction = createAction(
  '[User] Request user',
  props<{ userId: number }>(),
);

export const requestUserSuccessAction = createAction(
  '[User] Request user success',
  props<UserState>()
);

export const requestUserFailureAction = createAction(
  '[User] Request user failure',
  (error: any) => ({error}),
);

export const setUserAction = createAction(
  '[User] Set user',
  props<UserState>()
);
