import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor() {
    this.tokenChange.subscribe((value) => { // used since the app component doesn't reload, but needs to change the navbar
      this.token = value;
    })
  }

  tokenChange: Subject<string> = new Subject<string>();
  token: string = "";
  isAuthorized: boolean = false;

  authorize(token: string) {
    this.tokenChange.next(token);
    this.isAuthorized = true;
  }
}
