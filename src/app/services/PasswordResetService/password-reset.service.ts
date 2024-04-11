import { Injectable } from '@angular/core';
import { ConfigService } from '../ConfigService/config.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ResetForgotPasswordResponse } from '../../../_interfaces/resetForgotPasswordResponse.interface';
import { ResetForgotPasswordRequest } from '../../../_interfaces/resetForgotPasswordRequest.interface';
import { ResetPasswordRequest } from '../../../_interfaces/resetPasswordRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {
  config!:any;

  constructor(
    private configService: ConfigService,
    private http: HttpClient,
    private router: Router
  ) { 
    this.configService.getConfig().subscribe((data: any) => {
      this.config = { ...data }
    })
  }

  // Service to make Forgot Password reset(Get the password reset link via email)
  forgotPassword(email: string){
    return this.http.post<any>(`${this.config.baseurl}forgotpassword`, {
      email: email
    })
  }

  // Service to submit Reset Forgot Password
  resetForgotPassword(reqData: ResetForgotPasswordRequest){
    return this.http.post<ResetForgotPasswordResponse>(`${this.config.baseurl}resetforgotpassword`, reqData);
  }

  // Service to submit Reset Password form(For logged in users only)
  resetPassword(data: ResetPasswordRequest){
    return this.http.post<any>(`${this.config.baseurl}resetpassword`, data);
  }
}
