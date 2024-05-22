import {RouterState} from './router';
import {AuthState} from "./auth";
import {ConfigState} from "./config";
import {UserState} from "./user";
import {CitiesState} from "./cities";
import {TicketsState} from "./tickets";

export interface AppState {
  authState: AuthState,
  configState: ConfigState,
  userState: UserState,
  citiesState: CitiesState,
  ticketsState: TicketsState,
  routerState: RouterState,
}
