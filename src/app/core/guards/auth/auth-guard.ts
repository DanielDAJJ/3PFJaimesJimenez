import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../services/users/user';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if(!userService.isLoggedIn()){
    //Si no funciona con currentUserLoginOn$, usar otro la verificacion con el metodo login()
    router.navigate(['/login']);
    return false;
  }



  return true;
};
