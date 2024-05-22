import {AuthEffects} from './auth';
import {UserEffects} from './user';
import {CitiesEffects} from './cities';
import {TicketsEffects} from './tickets';
import {ConfigEffects} from "./config";

export const appEffects: any[] = [
  AuthEffects,
  ConfigEffects,
  UserEffects,
  CitiesEffects,
  TicketsEffects
];
