import {createAction, props} from '@ngrx/store';
import {CitiesState} from "./";

export const loadCitiesAction = createAction(
  '[Cities] Load cities',
);

export const loadCitiesSuccessAction = createAction(
  '[Cities] Load cities SUCCESS',
  props<CitiesState>()
);

export const loadCitiesFailureAction = createAction(
  '[Cities] Load cities FAILURE',
  (error: any) => ({error}),
);
