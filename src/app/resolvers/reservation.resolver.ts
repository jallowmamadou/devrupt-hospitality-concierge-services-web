import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ApaleoBookingService } from '../services/apaleo-booking.service';

@Injectable({
    providedIn: 'root',
})
export class ReservationResolver implements Resolve<any> {
    constructor(private bookingService: ApaleoBookingService) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<Observable<any> | Promise<any> | any> {
        if (route.paramMap.get('reservationId')) {
            return this.bookingService.findBooking(route.paramMap.get('reservationId'));
        }

        const reservationId = window.localStorage.getItem('reservationId');
        if (route.queryParams['reservationId']) {
            window.localStorage.setItem(
                'reservationId',
                route.queryParams['reservationId']
            );

            return this.bookingService.findBooking(
                route.queryParams['reservationId']
            );
        }

        if (reservationId) {
            return this.bookingService.findBooking(reservationId);
        }
    }
}
