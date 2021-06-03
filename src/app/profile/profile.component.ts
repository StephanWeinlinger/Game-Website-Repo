import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../authorization.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private authorization: AuthorizationService) {
    if(this.authorization.isAuthorized) {
      this.http.post<{ username: string, country: string, city: string, score: string | number }>('http://localhost:4201/profile', { token: this.authorization.token }, this.httpOptions)
      .subscribe((responseData) => {
        this.username = responseData.username;
        this.country = responseData.country;
        this.city = responseData.city;
        this.score =responseData.score;
      });
    }
    else {
      this.router.navigate(['/home']);
    }
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  username: string = "";
  country: string = "";
  city: string = "";
  score: string | number = "";

  ngOnInit(): void {
  }

}
