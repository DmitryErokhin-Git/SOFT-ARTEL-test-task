import {CitiesState} from './cities.interface';
import {createFeatureSelector, createSelector} from "@ngrx/store";

export const citiesStateFeatureSelector = createFeatureSelector<CitiesState>('citiesState');
export const citiesSelector = createSelector(
  citiesStateFeatureSelector,
  (state: CitiesState) => state.cities
);
