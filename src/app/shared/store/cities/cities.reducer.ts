import {createReducer, on} from '@ngrx/store';
import {CitiesState, loadCitiesAction, loadCitiesFailureAction, loadCitiesSuccessAction,} from './';
import {deleteAllDataAction} from "../app.actions";

const initialState: CitiesState = {
  cities: [],
};

export const citiesReducer = createReducer(
  initialState,
  on(loadCitiesAction, (state, action) => ({
    ...state,
    type: action.type,
  })),
  on(loadCitiesSuccessAction,
    (state, action) => ({
      ...state,
      cities: action.cities,
      type: action.type,
    })),
  on(loadCitiesFailureAction,
    (state, action) => ({
      ...state,
      cities: initialState.cities,
      error: action.error,
      type: action.type,
    })),
  on(deleteAllDataAction,
    (state, action) => ({
      ...state,
      cities: initialState.cities,
      type: action.type,
    })),
);

