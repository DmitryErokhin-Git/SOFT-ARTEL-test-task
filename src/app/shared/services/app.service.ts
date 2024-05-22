import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  containsNonDigitCharacter(inputString: string): boolean {
    const regex = /\D/;
    return regex.test(inputString);
  }
}
