import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState, checkAuthAction, isAuthenticatedSelector} from "../store";
import {distinctUntilChanged, map, skip, take, tap} from "rxjs";


export const LoginGuardCanActivate: CanActivateFn = (route, state) => {

  const store: Store<AppState> = inject(Store<AppState>);
  const router: Router = inject(Router);

  store.dispatch(checkAuthAction());

  return store.select(isAuthenticatedSelector).pipe(
    skip(1),
    take(1),
    distinctUntilChanged(),
    tap((isAuthenticated: boolean) => {
      if (!isAuthenticated) {
        router.navigate(['/login'], {queryParams: {}}).then();
      }
    }),
    map((isAuthenticated: boolean) => isAuthenticated)
  );
};
