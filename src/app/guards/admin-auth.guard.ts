import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from '../services/admin.service';

@Injectable({
    providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
    constructor(private router: Router, private adminService: AdminService) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const accountCode = route.queryParams['accountCode'];
        const propertyId = route.queryParams['propertyId'];
        const subjectId = route.queryParams['subjectId'];
        return accountCode && propertyId && subjectId
    }
}
