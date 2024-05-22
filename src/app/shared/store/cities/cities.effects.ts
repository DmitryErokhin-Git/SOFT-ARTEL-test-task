import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ApiService} from "../../services/api.service";
import {catchError, finalize, map, of, switchMap, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {loadCitiesAction, loadCitiesFailureAction, loadCitiesSuccessAction} from "./cities.actions";
import {NgxUiLoaderService} from "ngx-ui-loader";

@Injectable()
export class CitiesEffects {

  requestCitiesEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCitiesAction),
      tap(() => this.loader.start('master')),
      switchMap(() => this.apiService.getCities().pipe(
        map((cities) => loadCitiesSuccessAction({cities})),
        catchError(error => of(loadCitiesFailureAction({error}))),
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
