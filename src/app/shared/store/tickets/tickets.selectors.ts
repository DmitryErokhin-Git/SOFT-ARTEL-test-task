import {TicketsState} from './tickets.interface';
import {createFeatureSelector, createSelector} from "@ngrx/store";

export const ticketsStateFeatureSelector = createFeatureSelector<TicketsState>('ticketsState');
export const ticketsSelector = createSelector(
  ticketsStateFeatureSelector,
  (state: TicketsState) => state.tickets
);
