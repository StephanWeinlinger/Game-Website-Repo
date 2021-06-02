import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http: HttpClient) {
    this.tokenChange.subscribe((value) => { // used since the app component doesn't reload, but needs to change the navbar
      this.token = value;
    })
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  tokenChange: Subject<string> = new Subject<string>();
  token: string = "";
  isAuthorized: boolean = false;

  authorize(token: string) {
    this.tokenChange.next(token);
    this.isAuthorized = true;
  }

  unauthorize() {
    this.http.post<{ message: string }>('http://localhost:4201/logout', { token: this.token }, this.httpOptions)
      .subscribe((responseData) => {
        this.tokenChange.next("");
        this.isAuthorized = false;
        console.log(responseData.message);
      });
  }
}
