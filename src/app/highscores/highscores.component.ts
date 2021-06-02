import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-highscores',
  templateUrl: './highscores.component.html',
  styleUrls: ['./highscores.component.css']
})
export class HighscoresComponent implements OnInit {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private router: Router) {
    this.http.get<{ highscores: any }>('http://localhost:4201/highscore', this.httpOptions)
    .subscribe((responseData) => {
      this.highscores = responseData.highscores;
    });
    
  }

  highscores = [];

  displayedColumns: string[] = ['username', 'score'];
  
  ngOnInit(): void {
  }
}
