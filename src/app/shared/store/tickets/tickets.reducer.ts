import {createReducer, on} from '@ngrx/store';
import {
  loadTicketsAction,
  loadTicketsFailureAction,
  loadTicketsSuccessAction,
  setTicketsAction
} from './tickets.actions';
import {TicketsState} from "./tickets.interface";
import {deleteAllDataAction} from "../app.actions";

const initialState: TicketsState = {
  tickets: [],
};

export const ticketsReducer = createReducer(
  initialState,
  on(loadTicketsAction, (state, action) => ({
    ...state,
    type: action.type,
  })),
  on(loadTicketsSuccessAction,
    (state, action) => ({
      ...state,
      tickets: action.tickets,
      type: action.type,
    })),
  on(loadTicketsFailureAction,
    (state, action) => ({
      ...state,
      tickets: initialState.tickets,
      error: {...action.error},
      type: action.type,
    })),
  on(setTicketsAction,
    (state, action) => ({
      ...state,
      tickets: action.tickets,
      type: action.type,
    })),
  on(deleteAllDataAction,
    (state, action) => ({
      ...state,
      tickets: initialState.tickets,
      type: action.type,
    })),
);
