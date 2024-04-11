import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/AuthService/auth.service';
import { AuthValidationService } from '../services/AuthService/auth-validation.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authValidationService = inject(AuthValidationService);
  const router = inject(Router);

  if(authValidationService.isLoggedIn()){
    return true;
  }
  router.navigate(['login']);
  return false;
};
