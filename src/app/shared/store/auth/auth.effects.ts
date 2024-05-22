import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {finalize, of, switchMap, take, tap} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {
  checkAuthAction,
  checkAuthFailureAction,
  checkAuthSuccessAction,
  loginAction,
  loginFailureAction,
  loginSuccessAction,
  logoutAction
} from './';
import {ApiService} from "../../services/api.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {setUserAction} from "../user";
import {ToastrService} from "ngx-toastr";
import {CookiesService} from "../../services/cookies.service";
import {CookieService} from "ngx-cookie-service";
import {NOTIFICATION} from "../../constants/constants";
import {deleteAllDataAction} from "../app.actions";
import {Router} from "@angular/router";
import {User} from "../../interfaces/interfaces";

@Injectable()
export class AuthEffects {

  loginEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      tap((): void => {
        if (!this.loader.getLoader('master')) this.loader.start('master');
      }),
      switchMap((action) => this.apiService.findUser(action?.username).pipe(
        take(1),
        switchMap((users: User[]) => {
          if (users.length === 0 || users[0]?.username !== action?.username) {
            this.toastr.warning(NOTIFICATION.INVALID_USERNAME);
            return of(loginFailureAction({error: NOTIFICATION.INVALID_USERNAME}));
          } else if (users[0]?.password !== action?.password) {
            this.toastr.warning(NOTIFICATION.INVALID_PASSWORD);
            return of(loginFailureAction({error: NOTIFICATION.INVALID_PASSWORD}));
          } else {
            return of(loginSuccessAction({...users[0]}));
          }
        })
      )),
      catchError(error => {
        console.log(error);
        this.toastr.error(NOTIFICATION.AUTH_ERROR);
        return of(loginFailureAction({error}));
      }),
      finalize((): void => {
        if (this.loader.getLoader('master')) this.loader.stop('master');
      })
    )
  );

  loginSuccessEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccessAction),
      tap((): void => {
        if (!this.loader.getLoader('master')) this.loader.start('master');
      }), switchMap((user) => {
        this.cookiesService.setCookies(user?.username, user?.password, JSON.stringify(user));
        this.router.navigate(['/tickets'], {queryParams: {}}).then();
        return of(setUserAction({user}));
      }),
      finalize((): void => {
        if (this.loader.getLoader('master')) this.loader.stop('master');
      })
    ),
  );

  loginFailureEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkAuthFailureAction, loginFailureAction, logoutAction),
      tap((): void => {
        if (!this.loader.getLoader('master')) this.loader.start('master');
      }),
      switchMap((error) => {
        this.cookiesService.deleteCookies();
        this.router.navigate(['/login'], {queryParams: {}}).then();
        return of(deleteAllDataAction());
      }),
      finalize((): void => {
        if (this.loader.getLoader('master')) this.loader.stop('master');
      })
    ),
  );

  checkAuthEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkAuthAction),
      tap((): void => {
        if (!this.loader.getLoader('master')) this.loader.start('master');
      }),
      switchMap((action) => {
        const userdata: User | undefined = this.cookieService.check('userdata') ? JSON.parse(this.cookieService.get('userdata')) : undefined;
        const username: string | undefined = this.cookieService.check('username') ? this.cookieService.get('username') : undefined;
        const password: string | undefined = this.cookieService.check('password') ? this.cookieService.get('password') : undefined;

        if (!userdata?.id || !username || !password) {
          this.router.navigate(['/login'], {queryParams: {}}).then();
          return of(checkAuthFailureAction({error: NOTIFICATION.USER_NOT_AUTH}));
        } else {
          return this.apiService.getUserApiById(userdata?.id).pipe(
            take(1),
            switchMap((user: User) => {
              if (username === user.username && password === user.password) {
                return of(checkAuthSuccessAction(user));
              } else {
                return of(checkAuthFailureAction({error: NOTIFICATION.USER_NOT_AUTH}));
              }
            }),
            catchError(error => {
              console.error(error);
              this.toastr.error(NOTIFICATION.USER_FETCHING_ERROR);
              return of(checkAuthFailureAction({error}));
            }),
            finalize((): void => {
              if (this.loader.getLoader('master')) this.loader.stop('master');
            })
          );
        }
      })
    )
  );

  checkAuthSuccessEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkAuthSuccessAction),
      tap((): void => {
        if (!this.loader.getLoader('master')) this.loader.start('master');
      }),
      switchMap((user) => {
        return of(setUserAction({user}));
      }),
      finalize((): void => {
        if (this.loader.getLoader('master')) this.loader.stop('master');
      })
    ),
  );

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private cookiesService: CookiesService,
    private loader: NgxUiLoaderService,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private router: Router,
  ) {
  }

}
