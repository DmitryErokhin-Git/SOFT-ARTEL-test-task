import {Injectable} from '@angular/core';
import {firstValueFrom, map, Observable} from "rxjs";
import {AppState, loginAction, logoutAction, userSelector} from "../store";
import {Store} from "@ngrx/store";
import {User} from "../interfaces/interfaces";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authUser$: Observable<User> = this.store.select(userSelector);

  constructor(private store: Store<AppState>) {
  }

  async signIn(username: string, password: string): Promise<void> {
    this.store.dispatch(loginAction({username, password}));
  }

  async signOut(): Promise<void> {
    this.store.dispatch(logoutAction());
  }

  async getUserFromStore(): Promise<User> {
    return await firstValueFrom(
      this.store.select(userSelector).pipe(
        map((user: User) => user)
      )
    );
  }

}
