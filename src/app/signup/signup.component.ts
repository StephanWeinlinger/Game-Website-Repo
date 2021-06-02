import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, NgForm, NgModel, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  company: string = "FH Technikum Wien";
  hide1: boolean = true;
  hide2: boolean = true;
  errorEmail: boolean = true;
  errorPW: boolean = true;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

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
    let validator = new FormControl(password.value, [Validators.required, Validators.min(8)]);
    if(validator.hasError('required')) {
      this.errorPW = true;
      return 'You must enter a value!';
    }
    if(password.errors != null) {
      if(password.errors.minlength.actualLength < 8) {
        this.errorPW = true;
        return 'Atleast 8 characters are needed!';
      }
    }
    this.errorPW = false;
  }

  comparePasswords(password: NgModel, passwordconfirm: NgModel) {
    if(password.value != passwordconfirm.value) {
      this.errorPW = true;
      return 'Passwords are not equal!';
    }
  }

  onSubmit(form: NgForm) {
    form.value["company"] = this.company;
    if((form.value.email == "" && form.value.password == "" && form.value.passwordconfirm == "") || this.errorEmail || this.errorPW) {
      alert('SignUp failed!');
    }
    else {
      this.http.post<{ message: string }>('http://localhost:4201/signup', form.value, this.httpOptions)
          .subscribe((responseData) => {
            console.log(responseData.message);
          });
    }
  }

}