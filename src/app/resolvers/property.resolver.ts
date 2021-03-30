import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from '../services/admin.service';

@Injectable({
    providedIn: 'root',
})
export class PropertyResolver implements Resolve<any> {
    constructor(private adminService: AdminService) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {

        // const accountCode = route.queryParams['accountCode'];
        // const subjectId = route.queryParams['subjectId'];
        return this.adminService.findProperty(route.queryParams['propertyId']);
    }
}
