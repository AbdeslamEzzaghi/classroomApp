import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null; 
  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.signin(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      (response) => {
        console.log(response);
        this.isLoading = false;
        this.router.navigate(['/stagiaires']);
      },
      (errorMessage) => {
        this.isLoading = false;
        this.error = errorMessage;
        console.log('here is the message');
        console.log(errorMessage);
      }
    );

    //console.log(form.value);

    form.reset();
  }

  onHandleClose(){
    this.error = null;
  }
}
/*
      this.authService.signup(email,password).subscribe(
        response => {
          this.isLoading = false;
          console.log(response);
        },
        errorMessage => {
          this.isLoading = false;
          this.error = errorMessage ;
          console.log("here is the message");         
          console.log(errorMessage)
        }
      );
*/
