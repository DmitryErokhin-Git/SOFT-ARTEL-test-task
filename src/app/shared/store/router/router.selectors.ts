import {createFeatureSelector, createSelector} from "@ngrx/store";
import {RouterReducerState} from "@ngrx/router-store";
import {RouterState} from "./router.interface";

export const routerStateFeatureSelector = createFeatureSelector<RouterReducerState<RouterState>>('routerState');
export const routerStateSelector = createSelector(
  routerStateFeatureSelector,
  (state: RouterReducerState<RouterState>) => state.state
);
