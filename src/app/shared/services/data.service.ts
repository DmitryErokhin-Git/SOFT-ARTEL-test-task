import {Injectable} from '@angular/core';
import {Ticket, TicketExt, User} from '../interfaces/interfaces';
import {ApiService} from './api.service';
import {ToastrService} from 'ngx-toastr';
import {BehaviorSubject, catchError, first, Observable, take, tap} from 'rxjs';
import {NOTIFICATION} from '../constants/constants';
import {AppState, loadConfigAction, loadTicketsAction, setTicketsAction, ticketsSelector, userSelector} from "../store";
import {Store} from "@ngrx/store";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public tableData$: Observable<TicketExt[]> = this.store.select(ticketsSelector);
  public loadingSubject = new BehaviorSubject<boolean>(true);
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor(private apiService: ApiService,
              private toastr: ToastrService,
              private store: Store<AppState>,
              private authService: AuthService) {
  }

  loadTableData(): void {
    this.store.dispatch(loadConfigAction());

    this.store.select(userSelector).pipe(
      first((user: User): boolean => user.id > 0),
      take(1),
      tap((user: User): void => {
        this.store.dispatch(loadTicketsAction({userId: user.id}));
      }),
      catchError((err) => {
        this.toastr.error(err.message);
        throw err;
      }),
    ).subscribe();
  }

  addTicket(newTicket: Ticket): void {
    this.apiService.addTicket(newTicket).pipe(
      tap((ticket: TicketExt): void => {
        this.toastr.success(NOTIFICATION.TICKET_ADD);
        this.store.dispatch(loadTicketsAction({userId: ticket.userId}));
      }),
      catchError((err) => {
        this.toastr.error(err.message);
        throw err;
      }),
    ).subscribe();
  }

  editTicket(editTicket: TicketExt): void {
    this.apiService.editTicket(editTicket).pipe(
      tap((ticket: TicketExt): void => {
        this.store.dispatch(loadTicketsAction({userId: ticket.userId}));
        this.toastr.success(NOTIFICATION.TICKET_EDIT);
      }),
      catchError((err) => {
        this.toastr.error(err.message);
        throw err;
      }),
    ).subscribe();
  }

  deleteTicket(ticket: TicketExt): void {
    this.apiService.deleteTicket(ticket.id).pipe(
      tap(async (): Promise<void> => {
        this.store.dispatch(loadTicketsAction({userId: ticket.userId}));
        this.toastr.success(NOTIFICATION.TICKET_DELETE);
      }),
      catchError((err) => {
        this.toastr.error(err.message);
        throw err;
      }),
    ).subscribe();
  }

  saveUserData(updateUser: User): void {
    this.apiService.updateUser(updateUser).pipe(
      tap((): void => {
        this.toastr.success(NOTIFICATION.USER_UPDATE_SUCCESS);
      }),
      catchError((err: any) => {
        this.toastr.success(NOTIFICATION.USER_UPDATE_ERROR);
        throw err;
      })
    ).subscribe();
  }

  async search(keyword: string): Promise<void> {
    const user = await this.authService.getUserFromStore();
    this.apiService.getFilterTickets(keyword, user.id).pipe(
      tap(async (tickets: TicketExt[]): Promise<void> => {
        this.store.dispatch(setTicketsAction({tickets}));
        if (tickets.length === 0) this.toastr.info(NOTIFICATION.NO_MATCHES);
      }),
      catchError((err) => {
        this.toastr.error(err.message);
        throw err;
      }),
    ).subscribe();
  }

}
