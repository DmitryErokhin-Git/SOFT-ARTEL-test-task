import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../shared/interfaces/interfaces";
import {combineLatest, Observable, Subject, take, takeUntil, tap} from "rxjs";
import {AppState, citiesSelector, loadCitiesAction, routerStateSelector, userSelector} from "../../shared/store";
import {Store} from "@ngrx/store";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../shared/services/data.service";
import {Router} from "@angular/router";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {ToastrService} from "ngx-toastr";
import {AppService} from "../../shared/services/app.service";
import {NOTIFICATION} from "../../shared/constants/constants";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  public user$!: Observable<User>;
  public cities$!: Observable<string[]>;
  public formUser: FormGroup = new FormGroup({});
  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store<AppState>,
              private formBuilder: FormBuilder,
              private dataService: DataService,
              private loader: NgxUiLoaderService,
              public toastr: ToastrService,
              private appService: AppService,
              private router: Router,
  ) {
    this.store.dispatch(loadCitiesAction());
  }

  async ngOnInit(): Promise<void> {
    this.loader.start('master');

    this.user$ = this.store.select(userSelector);
    this.cities$ = this.store.select(citiesSelector);

    combineLatest([
      this.store.select(routerStateSelector),
      this.user$,
    ]).pipe(
      take(1),
      takeUntil(this.unsubscribe$),
      tap(async ([params, user]): Promise<void> => {
        const userId = params?.params['userId'];
        if (!userId) {
          this.router.navigate(['/tickets']).then();
        } else if (this.appService.containsNonDigitCharacter(userId)) {
          this.toastr.error(NOTIFICATION.USER_INVALID_ID);
          this.router.navigate(['/profile/' + user.id]).then();
        } else if (Number(userId) !== user.id) {
          this.router.navigate(['/profile/' + user.id]).then();
        }
      }),
    ).subscribe();

    this.user$.pipe(
      takeUntil(this.unsubscribe$),
      tap((user: User): void => {
        this.formUser = this.formBuilder.group({
          id: [{value: user.id, disabled: true}, Validators.required],
          name: [user.name, Validators.required],
          avatar: [user.avatar, Validators.required],
          surname: [user.surname, Validators.required],
          login: [user.login, Validators.required],
          email: [user.username, Validators.required],
          password: [user.password, Validators.required],
          city: [user.city, Validators.required],
          date: [user.date, Validators.required],
        });
      })
    ).subscribe();

    if (this.loader.getLoader('master')) this.loader.stop('master');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  saveUserData(): void {
    this.dataService.saveUserData(this.formUser.getRawValue());
  }

}
