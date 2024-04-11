import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/AuthService/auth.service';

export const employeeAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const role = authService.getRoleFromJWT();

  if(role === "employer"){
    return true;
  }
  alert("You don't have rights to access this route! If you have credentials then login and try again!");
  router.navigate(['login']);
  return false;
};
