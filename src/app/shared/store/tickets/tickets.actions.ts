import {createAction, props} from '@ngrx/store';
import {TicketsState} from "./";

export const loadTicketsAction = createAction(
  '[Tickets] Load tickets',
  props<{ userId: number }>(),
);

export const loadTicketsSuccessAction = createAction(
  '[Tickets] Load tickets SUCCESS',
  props<TicketsState>()
);

export const loadTicketsFailureAction = createAction(
  '[Tickets] Load tickets FAILURE',
  (error: any) => ({error}),
);

export const setTicketsAction = createAction(
  '[Tickets] Set tickets',
  props<TicketsState>()
);
