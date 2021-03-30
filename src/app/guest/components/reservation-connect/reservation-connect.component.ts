import { Component, OnInit } from '@angular/core';
import { ApaleoBookingService } from '../../../services/apaleo-booking.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservation-connect',
  templateUrl: './reservation-connect.component.html',
  styleUrls: ['./reservation-connect.component.scss'],
})
export class ReservationConnectComponent implements OnInit {
  constructor(
    private apaleoBookingService: ApaleoBookingService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.apaleoBookingService
      .findBooking(this.route.snapshot.queryParams['reservationId'])
      .then((reservation: any) => {
        // window.localStorage.setItem('hotelId', reservation.property.id);
        // window.localStorage.setItem('reservationId', reservation.id);

        this.router
          .navigateByUrl(
            `/hotel/home?hotelId=${reservation.property.id}&reservationId=${reservation.id}`
          )
          .then();
      })
      .catch((error) => {
        console.log(error);
        this.router.navigateByUrl(`/`).then();
      });
  }
}
