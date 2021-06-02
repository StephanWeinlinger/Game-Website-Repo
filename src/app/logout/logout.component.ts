import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../authorization.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private authorization: AuthorizationService) {
    if(this.authorization.isAuthorized) {
      this.authorization.unauthorize();
      this.router.navigate(['/home']);
    }
    else {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
  }

}
