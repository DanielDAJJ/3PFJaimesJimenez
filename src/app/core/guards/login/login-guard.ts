import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { UserService } from '../../services/users/user';
import { map, Observable } from 'rxjs';

export const loginGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.currentUserLoginOn$.pipe(
    map(isLoggedIn => isLoggedIn ? router.createUrlTree(['/dashboard']) : true)
  );

};
