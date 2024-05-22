import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, finalize, map, of, switchMap, tap} from 'rxjs';
import {loadConfigAction, loadConfigFailureAction, loadConfigSuccessAction} from './';
import {ApiService} from "../../services/api.service";
import {NgxUiLoaderService} from "ngx-ui-loader";

@Injectable()
export class ConfigEffects {

  requestConfigEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadConfigAction),
      tap(() => this.loader.start('master')),
      switchMap(() => this.apiService.getTableConfig().pipe(
        map((config) => loadConfigSuccessAction({config})),
        catchError(error => of(loadConfigFailureAction({error}))),
        finalize(():void => {
          if (this.loader.getLoader('master')) this.loader.stop('master');
        })))
    )
  );

  // requestConfigSuccessEffect$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(requestConfigSuccessAction),
  //     map((action) => requestTicketsAction({userId: action.userId}),
  //     catchError(error => of(requestConfigFailureAction({error})))
  //   ));

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private loader: NgxUiLoaderService,
  ) {
  }

}
