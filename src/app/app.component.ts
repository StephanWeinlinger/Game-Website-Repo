import { Component } from '@angular/core';
import { AuthorizationService } from './authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FHTW Puzzle Game';

  constructor(private authorization: AuthorizationService) {}

  // returns auth token
  get isAuthorized(): boolean {
    return this.authorization.token != "" ? true : false;
  }
}
