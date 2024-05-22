import {ActionReducerMap} from '@ngrx/store';
import {AppState} from './app.interface';
import {authReducer} from './auth';
import {configReducer} from "./config";
import {userReducer} from "./user";
import {citiesReducer} from "./cities";
import {ticketsReducer} from "./tickets";
import {routerReducer} from '@ngrx/router-store';


export const appReducers: ActionReducerMap<AppState> = {
  authState: authReducer,
  configState: configReducer,
  userState: userReducer,
  citiesState: citiesReducer,
  ticketsState: ticketsReducer,
  routerState: routerReducer,
};
