import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationToken : any;

  API_KEY = 'AIzaSyDI4-YaZSdVUB9_QbquxlwR4bV2_OoWELs';
  frbsSignUpApiURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`;
  frbsSignInApiURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`;

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.frbsSignUpApiURL, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          this.handleAuthetication(
            response.email,
            response.localId,
            response.idToken,
            response.expiresIn
          );
        })
      );
  }
  signin(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.frbsSignInApiURL, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          this.handleAuthetication(
            response.email,
            response.localId,
            response.idToken,
            response.expiresIn
          );
        })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    
    if(this.tokenExpirationToken){
      clearTimeout(this.tokenExpirationToken);
    }
    this.tokenExpirationToken = null;
  }

  autoLogout(expirationDuration : number){
    console.log(expirationDuration);
    this.tokenExpirationToken = setTimeout(()=>{
      this.logout();
    },expirationDuration)

  }

  private handleAuthetication(
    email: string,
    id: string,
    token: string,
    expiresIn: string
  ) {
    const expiringDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const newUser = new User(email, id, token, expiringDate);

    this.user.next(newUser);
    this.autoLogout(+expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(newUser));
  }
  autoLogin() {
    const userStored: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userStored) {
      return;
    }

    const loadedUser = new User(
      userStored.email,
      userStored.id,
      userStored._token,
      new Date(userStored._tokenExpirationDate)
    );

    if(loadedUser.token){
      const expirationDuration : number = new Date(userStored._tokenExpirationDate).getTime() - new Date().getTime(); 
      this.autoLogout(expirationDuration);
      this.user.next(loadedUser);      
    }
  }
  private handleError(errorRes: HttpErrorResponse) {
    let customErr = 'an unknown error has occured';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(customErr);
    }
    console.log(errorRes.error.error.message);
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        customErr = 'this email already exists';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        customErr = 'credentials invalid';
        break;
    }
    return throwError(customErr);
  }
}
