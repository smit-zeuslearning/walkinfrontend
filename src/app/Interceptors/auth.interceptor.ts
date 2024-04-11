import { HttpErrorResponse, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Injectable, Injector, inject } from "@angular/core"
import { AuthService } from "../services/AuthService/auth.service";
import { catchError, throwError } from "rxjs";
import { AuthValidationService } from "../services/AuthService/auth-validation.service";

export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
 ) => {
  const authValidationService = inject(AuthValidationService)
  if(authValidationService.isLoggedIn()){
    const JWTToken = authValidationService.getJWTToken();
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${JWTToken}`)
    })
    return next(authReq);
  }

  return next(req);
 };
 