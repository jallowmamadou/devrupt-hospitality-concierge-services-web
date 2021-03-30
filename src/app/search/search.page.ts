import { Component, OnInit } from '@angular/core';
import { ApaleoBookingService } from '../services/apaleo-booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  reservationId: string;

  constructor(
    private apaleoBookingService: ApaleoBookingService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit() {
    return null;
  }

  async searchReservation(event) {
    event.preventDefault();
    const {
      id: reservationId,
      property: hotel,
    }: any = await this.apaleoBookingService.findBooking(this.reservationId);

    window.localStorage.setItem('hotelId', hotel.id);
    window.localStorage.setItem('reservationId', reservationId);

    await this.apaleoBookingService.saveGuestReservation(
      reservationId,
      hotel.id
    );

    window.location.reload();
  }
}
