import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, take} from 'rxjs';
import {TableConfig, Ticket, TicketExt, User} from '../interfaces/interfaces';
import {environment} from '../../../environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly resourceUrl = `${environment.urlBackEndApi}`;

  constructor(private http: HttpClient) {
  }

  findUser(username: string, password?: string): Observable<User[]> {
    let params: HttpParams = new HttpParams().set('username', username);
    if (password) params = params.set('password', password);
    return this.http.get<User[]>(`${this.resourceUrl}/users/`, {params: params}).pipe(take(1));
  }

  getUserApiById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.resourceUrl}/users/${userId}`).pipe(take(1));
  }

  updateUser(updateUser: User): Observable<User> {
    return this.http.patch<User>(`${this.resourceUrl}/users/${updateUser.id}`, updateUser).pipe(take(1));
  }

  getCities(): Observable<string[]> {
    return this.http.get<string[]>(`${this.resourceUrl}/cities`).pipe(take(1));
  }

  getTableConfig(): Observable<TableConfig> {
    return this.http.get<TableConfig>(`${this.resourceUrl}/config`).pipe(take(1));
  }

  getUserTickets(userId: number): Observable<TicketExt[]> {
    const params: HttpParams = new HttpParams().set('userId', userId.toString());
    return this.http.get<TicketExt[]>(`${this.resourceUrl}/tickets`, {params}).pipe(take(1));
  }

  getTicketById(ticketId: number): Observable<TicketExt[]> {
    const params: HttpParams = new HttpParams().set('id', ticketId);
    return this.http.get<TicketExt[]>(`${this.resourceUrl}/tickets`, {params}).pipe(take(1));
  }

  getFilterTickets(keyword: string, userId: number): Observable<TicketExt[]> {
    let params: HttpParams = new HttpParams().set('q', keyword);
    params = params.append('userId', userId.toString());
    return this.http.get<TicketExt[]>(`${this.resourceUrl}/tickets`, {params}).pipe(take(1));
  }

  addTicket(newTicket: Ticket): Observable<TicketExt> {
    return this.http.post<TicketExt>(`${this.resourceUrl}/tickets`, newTicket).pipe(take(1));
  }

  editTicket(editTicket: TicketExt): Observable<TicketExt> {
    return this.http.patch<TicketExt>(`${this.resourceUrl}/tickets/${editTicket.id}`, editTicket).pipe(take(1));
  }

  deleteTicket(ticketId: number): Observable<void> {
    return this.http.delete<void>(`${this.resourceUrl}/tickets/${ticketId}`).pipe(take(1));
  }

}
