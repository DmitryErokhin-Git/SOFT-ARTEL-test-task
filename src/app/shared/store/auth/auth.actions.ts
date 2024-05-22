import {createAction, props} from '@ngrx/store';
import {User} from "../../interfaces/interfaces";

export const loginAction = createAction(
  '[Login] Login',
  props<{ username: string, password: string }>()
);

export const loginSuccessAction = createAction(
  '[Login] Login SUCCESS',
  props<User>()
);

export const loginFailureAction = createAction(
  '[Login] Login FAILURE',
  (error: any) => ({error}),
);

export const logoutAction = createAction(
  '[Login] Logout',
);


export const checkAuthAction = createAction(
  '[Auth] Check authenticated',
);

export const checkAuthSuccessAction = createAction(
  '[Auth] Check authenticated SUCCESS',
  props<User>()
);

export const checkAuthFailureAction = createAction(
  '[Auth] Check authenticated FAILURE',
  (error: any) => ({error}),
);
