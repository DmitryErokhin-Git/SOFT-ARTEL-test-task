import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, finalize, map, of, switchMap, tap} from 'rxjs';
import {ApiService} from "../../services/api.service";
import {loadTicketsAction, loadTicketsFailureAction, loadTicketsSuccessAction} from "./";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {TicketExt} from "../../interfaces/interfaces";

@Injectable()
export class TicketsEffects {
  requestTicketsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTicketsAction),
      tap(() => this.loader.start('master')),
      switchMap((action) => this.apiService.getUserTickets(action.userId).pipe(
        map((tickets: TicketExt[]) => loadTicketsSuccessAction({tickets})),
        catchError(error => of(loadTicketsFailureAction({error}))),
        finalize((): void => {
          if (this.loader.getLoader('master')) this.loader.stop('master');
        })
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private loader: NgxUiLoaderService,
  ) {
  }

}
