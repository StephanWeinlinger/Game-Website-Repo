import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, AfterViewInit, Renderer2, ViewChild, ComponentRef } from '@angular/core';
import { FormControl, NgForm, NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';

function swap(id: string) {
  console.log("test");
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private renderer: Renderer2) {
    if((typeof this.router.getCurrentNavigation().extras.state) != "undefined") {
      this.token = this.router.getCurrentNavigation().extras.state.token;
    }
    else {
      //this.router.navigate(['/']); // DONT FORGET
    }
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    params: new HttpParams()
  };

  token: string = "";

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.fillPlayfield();
    this.startTimer();
  }

  @ViewChild('playfield') playfield: ElementRef;
  playfieldArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  firstPick: HTMLElement = undefined;
  secondPick: HTMLElement = undefined;
  winCondition: boolean = false;
  totalSeconds: number = 0;
  time: string = "0 : 0 : 0";
  interval;

  startTimer() {
    this.interval = setInterval(() => {
      this.totalSeconds++;
      let seconds = this.totalSeconds % 60;
      let minutes = Math.floor(this.totalSeconds / 60) % 60;
      let hours = Math.floor(Math.floor(this.totalSeconds / 60) / 60);
      this.time = hours + " : " + minutes + " : " + seconds;
    }, 1000)
  }

  swap(id: string) {
    if(!this.winCondition) {
      if(this.firstPick != undefined) {
        this.secondPick = document.getElementById(id);
        // swap array entries
        let tmpID: number = this.playfieldArray[Number(this.firstPick.getAttribute("id"))];
        this.playfieldArray[Number(this.firstPick.getAttribute("id"))] = this.playfieldArray[Number(id)];
        this.playfieldArray[Number(id)] = tmpID;
        // swap image sources
        let tmpSource: string = this.firstPick.getAttribute("src");
        this.firstPick.setAttribute("src", this.secondPick.getAttribute("src"));
        this.secondPick.setAttribute("src", tmpSource);
  
        let sorted: boolean = true;
        for(let i: number = 0; i < this.playfieldArray.length; ++i) {
          if(this.playfieldArray[i] != i + 1) {
            sorted = false;
          }
        }
        if(sorted) {
          this.stopGame();
        }
        else {
          this.changeBorder(this.firstPick, "white");
        }
        this.firstPick = undefined;
        this.secondPick = undefined;
      }
      else {
        this.firstPick = document.getElementById(id);
        this.changeBorder(this.firstPick, "black");
      }
    }
  }

  stopGame(): void {
    this.winCondition = true;
    clearInterval(this.interval);
    // getElementsByClassName returns HTMLCollectionOf<Element> and Element doesn't have property style, so typecast is needed
    let cardArray: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("card")! as HTMLCollectionOf<HTMLElement>;
    for(let i: number = 0; i < 9; ++i) {
      cardArray[i].style.borderColor = "black";
    }
  }

  changeBorder(card: HTMLElement, color: string) {
    card.style.borderColor = color;
  }

  fillPlayfield(): void {
    this.shuffle();
    for(let i: number = 0; i < this.playfieldArray.length; ++i) {
      const newCard: HTMLImageElement = this.renderer.createElement('img');
      newCard.setAttribute("src", "assets/img/" + this.playfieldArray[i] + ".jpg");
      newCard.setAttribute("class", "card");
      newCard.setAttribute("id", String(i));
      newCard.addEventListener('click', (e) => { this.swap(String(i)) });
      if(i % 3 == 0 && i != 0) {
        newCard.style.clear = "both";
      }
      this.renderer.appendChild(this.playfield.nativeElement, newCard);
    }
  }

  shuffle(): void {
    let counter: number = this.playfieldArray.length;
    while (counter > 0) {
      const index: number = Math.floor(Math.random() * counter);
      counter--;
      const temp: number = this.playfieldArray[counter];
      this.playfieldArray[counter] = this.playfieldArray[index];
      this.playfieldArray[index] = temp;
    }
  }

  /*
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
  */

}



