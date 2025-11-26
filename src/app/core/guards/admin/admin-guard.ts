import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserService } from '../../services/users/user';

export const adminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const userService = inject(UserService);

  return userService.isAdmin$.pipe(
    map(isAdmin => isAdmin ? true : router.createUrlTree(['/dashboard']))
  );
};
