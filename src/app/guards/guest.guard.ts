import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const reservationId = route.queryParams['reservationId'];

    if (!reservationId && window.localStorage.getItem('reservationId')) {
      return this.router.navigate(['/guest'], {
        queryParams: {
          reservationId: reservationId,
        },
      });
    }

    if (reservationId) {
      window.localStorage.setItem('reservationId', reservationId);
      return this.router.navigate(['/guest'], {
        queryParams: {
          reservationId: reservationId,
        },
      });
    }
    return true;
  }
}
