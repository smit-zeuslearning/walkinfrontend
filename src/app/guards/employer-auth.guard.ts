import { CanActivateFn } from '@angular/router';

export const employerAuthGuard: CanActivateFn = (route, state) => {
  return true;
};
