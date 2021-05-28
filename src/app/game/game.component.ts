import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) {
    if((typeof this.router.getCurrentNavigation().extras.state) != "undefined") {
      this.token = this.router.getCurrentNavigation().extras.state.token;
    }
    else {
      this.router.navigate(['/']);
    }
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    params: new HttpParams()
  };

  token: string = "";

  ngOnInit(): void {
  }

  insertHighscore(form: NgForm) {
    form.value["token"] = this.token;
    this.http.post<{ message: string }>('http://localhost:4201/highscore', form.value, this.httpOptions)
    .subscribe((responseData) => {
      console.log(responseData.message);
    });
  }

  showHighscores() {
    this.httpOptions.params = this.httpOptions.params.append('token', this.token);
    this.http.get<{ highscores: object }>('http://localhost:4201/highscore', this.httpOptions)
    .subscribe((responseData) => {
      this.router.navigate(['/highscores'], { state: { token: this.token, highscores: responseData.highscores }});
    });
  }

  logout() {
    this.http.post<{ message: string }>('http://localhost:4201/logout', { token: this.token }, this.httpOptions)
    .subscribe((responseData) => {
      console.log(responseData.message);
      this.router.navigate(['/']);
    });
  }

}
