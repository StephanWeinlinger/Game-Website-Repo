import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from '../authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  errorEmail: boolean = true;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private router: Router, private authorization: AuthorizationService) { }

  ngOnInit(): void {
  }

  validateEmail(email: NgModel) {
    let validator = new FormControl(email.value, [Validators.required, Validators.email]);
    if(validator.hasError('required')) {
      this.errorEmail = true;
      return 'You must enter a value!';
    }
    if(validator.hasError('email')) {
      this.errorEmail = true;
      return 'Not a valid email!';
    }
    this.errorEmail = false;
  }

  validatePassword(password: NgModel) {
    let validator = new FormControl(password.value, [Validators.required]);
    if(validator.hasError('required')) {
      return 'You must enter a value!';
    }
  }

  onSubmit(form: NgForm) {
    if((form.value.email == "" && form.value.password == "") || this.errorEmail) {
      alert('Not all inputs are in a valid form!');
    }
    else {
      this.http.post<{ message: string, token: string }>('http://localhost:4201/login', form.value, this.httpOptions)
      .subscribe((responseData) => {
        this.authorization.authorize(responseData.token);
        this.router.navigate(['/profile']);
      });
    }
  }
}