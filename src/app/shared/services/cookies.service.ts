import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor(private cookieService: CookieService) {
  }

  public setCookies(username: string, password: string, userdata: string): void {
    this.cookieService.set('userdata', userdata, this.getExpiryDate(1), '/');
    this.cookieService.set('username', username, this.getExpiryDate(1), '/');
    this.cookieService.set('password', password, this.getExpiryDate(1), '/');
  }

  public deleteCookies(): void {
    // this.cookieService.deleteAll();
    this.cookieService.delete('userdata', '/');
    this.cookieService.delete('username', '/');
    this.cookieService.delete('password', '/');
  }

  private getExpiryDate(days: number): Date {
    const date: Date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    return date;
  }
}
