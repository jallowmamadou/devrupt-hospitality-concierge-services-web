import { Injectable } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import { Storage } from '@ionic/storage';
import { AngularFirestore } from '@angular/fire/firestore';

export enum ReservationStatus {
  PENDING ,
  CONFIRMED,
  INHOUSE,
  CHECKEDOUT,
  CANCELED,
  NOSHOW,
  ARCHIVED ,
}

@Injectable({
  providedIn: 'root',
})
export class ApaleoBookingService {
  private baseUrl = 'https://api.apaleo.com';

  constructor(
    private api: ApiServiceService,
    private storage: Storage,
    private store: AngularFirestore
  ) {}

  async findBooking(id: string) {
    return this.api.get(`reservations/${id}`).toPromise();
  }

  async saveGuestReservation(reservationId, hotelId) {
    return await this.store
        .collection('reservations')
        .doc(reservationId)
        .set({
          createdAt: new Date(),
          hotelId: hotelId,
          reservationId:reservationId,
          status: ReservationStatus.PENDING,
        });
  }
}
