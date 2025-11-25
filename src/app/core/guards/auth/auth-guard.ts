import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../services/users/user';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.currentUserLoginOn$.pipe(
    map(isLoggedIn => {
      return isLoggedIn ? true : router.navigate(['/login']), false;
    })
  );
};
