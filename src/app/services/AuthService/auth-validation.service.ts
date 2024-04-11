import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthValidationService {

  constructor() { }

  // Method to check whether user is logged in or not
  public isLoggedIn(): Boolean {
    const expiritionTime: Date | null = this.getJWTExpiritiontime();
    const JWTToken: string | null = localStorage.getItem('JWTToken');

    if (JWTToken && expiritionTime) {
      if (expiritionTime.valueOf() > Date.now()) {
        return true
      }
      return false
    }
    return false;
  }

  // Method to check whether user is logged out or not
  isLoggedOut(): Boolean {
    return !this.isLoggedIn();
  }

  // Method to get ROLE from the jwt
  getRoleFromJWT(): string{
    const jwt = localStorage.getItem('JWTToken');
    if(jwt != null){
      const jwtData:string = jwt.split('.')[1];
      const decodedJwtJsonData = window.atob(jwtData) ;
      const decodedJwtData = JSON.parse(decodedJwtJsonData) as { [key: string]: string};

      return decodedJwtData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    }
    return "";
  }

  // Method to get JWT Token Expirition time
  getJWTExpiritiontime(): Date | null {
    const datetime = localStorage.getItem('JWTTokenExpirition');
    if (datetime != null) {
      return new Date(datetime);
    }
    return null;
  }

  // Get the JWT Token
  getJWTToken(){
    return localStorage.getItem('JWTToken');
  }
}
