import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-highscores',
  templateUrl: './highscores.component.html',
  styleUrls: ['./highscores.component.css']
})
export class HighscoresComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) {
    if((typeof this.router.getCurrentNavigation().extras.state) != "undefined") { // used to supress error
      this.token = this.router.getCurrentNavigation().extras.state.token;
      this.highscores = this.router.getCurrentNavigation().extras.state.highscores;
    }
    else {
      this.router.navigate(["/"]);
    }
  }

  authenticated: boolean = false;
  token: string = "";
  highscores = [];

  displayedColumns: string[] = ['username', 'score'];
  

  ngOnInit(): void {
  }

  return() {
    this.router.navigate(['/game'], { state: { token: this.token }});
  }

}
