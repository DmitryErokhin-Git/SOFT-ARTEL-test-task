import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {finalize, map, of, switchMap, tap} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {requestUserAction, requestUserFailureAction, requestUserSuccessAction} from './';
import {ApiService} from "../../services/api.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {NOTIFICATION} from "../../constants/constants";
import {ToastrService} from "ngx-toastr";
import {User} from "../../interfaces/interfaces";

@Injectable()
export class UserEffects {

  requestUsersEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestUserAction),
      tap(() => this.loader.start('master')),
      switchMap((action) => this.apiService.getUserApiById(action.userId).pipe(
        map((user: User) => requestUserSuccessAction({user})),
        catchError(error => of(requestUserFailureAction({error}))),
        finalize((): void => {
          if (this.loader.getLoader('master')) this.loader.stop('master');
        })
      )),
      catchError(error => {
        console.error(error);
        this.toastr.error(NOTIFICATION.USER_FETCHING_ERROR);
        return of(requestUserFailureAction({error}));
      }),
      finalize((): void => {
        if (this.loader.getLoader('master')) this.loader.stop('master');
      })
    )
  );

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private loader: NgxUiLoaderService,
    private toastr: ToastrService,
  ) {
  }

}
