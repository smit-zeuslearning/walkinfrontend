import { Injectable } from '@angular/core';
import { ConfigService } from '../ConfigService/config.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Authenticated } from '../../../_interfaces/authenticated.interface';
import { catchError, retry, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { FresherUserRegistrationDto, UserRegistration } from '../../../_interfaces/userregistration.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  config: any = undefined;
  constructor(
    private configService: ConfigService,
    private http: HttpClient,
    private router: Router
  ) {
    this.configService.getConfig().subscribe((data: any) => {
      this.config = { ...data }
    })
  }

  // Method which perform actual login
  performLogin(email: string, password: string) {
    this.login(email, password).subscribe((data: Authenticated) => {
      this.setSession(data)
      alert("You are logged in successfully!");
      this.router.navigate(['']);
    })
  }

  // Service to login user
  login(email: string, password: string) {
    return this.http.post<Authenticated>(`${this.config.baseurl}login`, {
      "Email": email,
      "Password": password
    }).pipe(
      catchError(this.handleOnLoginError)
    );
  }

  // Method to set JWT Token in local storage
  private setSession(auth: Authenticated) {
    localStorage.setItem('JWTToken', auth.Token);
    localStorage.setItem('JWTTokenExpirition', auth.Expiration);
  }

  // Service to logout user
  logout() {
    localStorage.removeItem('JWTToken');
    localStorage.removeItem('JWTTokenExpirition');
  }

  // Method to handle request occurs during user login
  private handleOnLoginError(error: HttpErrorResponse) {
    if (error.status == 0) {
      alert('Network error occured. Please check network connectivity and try again!');
    } else if (error.status == 401) {
      alert('Username and/or password incorrect!');
    } else if (error.status == 500) {
      alert('Unexpected internal server error occured. Please try again after sometime!');
    } else {
      alert('Unexpected error occur. Please try later!');
    }
    return throwError(() => new Error('Soemthing bad happend. Please try again later!'));
  }

  // Method to perform signup
  performSignup(userData: UserRegistration | FresherUserRegistrationDto) {
    this.signup(userData).subscribe((data: Authenticated) => {
      this.setSession(data);
      alert("You are registered and login successfully!");
      this.router.navigate(['']);
    })
  }
  
  // Method to register user
  signup(userData: UserRegistration | FresherUserRegistrationDto) {
    return this.http.post<any>(`${this.config.baseurl}register`, userData)
      .pipe(
        catchError(this.handleRegisterUserError)
      );
  }

  // Method to handle Register user error
  private handleRegisterUserError(error: HttpErrorResponse){
    if (error.status == 0) {
      alert('Network error occured. Please check network connectivity and try again!');
    } else if (error.status == 409) {
      alert('User with given email already exist! Please enter diffrent email or try to login!');
    } else if (error.status == 500) {
      alert('Unexpected internal server error occured. Please try again after sometime!');
    } else {
      alert('Unexpected error occur. Please try later!');
    }
    return throwError(() => new Error('Soemthing bad happend. Please try again later!'));
  }


} 
