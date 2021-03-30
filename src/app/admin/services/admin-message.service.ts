import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReservationStatus } from '../../services/apaleo-booking.service';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminMessageService {
  constructor(private store: AngularFirestore) {}

  async sendMessage(message: string, reservationId, propertyId: string) {
    return await this.store.collection('messages').add({
      text: message,
      createdAt: new Date(),
      hotelId: propertyId,
      reservationId: reservationId,
      sender: {
        type: 'STAFF',
      },
    });
  }

  conversations(propertyId: string) {
    return this.getActiveReservations(propertyId).pipe(
      map((reservations) => {
        return reservations.map((reservation) => reservation['reservationId']);
      }),
      switchMap((reservationIds: string[]) =>
        this.getConversations(propertyId, reservationIds)
      )
    );
  }

  messages(reservationId: string) {
    return this.store
      .collection('messages', (ref) =>
        ref.where('reservationId', '==', reservationId).orderBy('createdAt')
      )
      .valueChanges({ idField: 'uuid' });
  }

  getActiveReservations(propertyId) {
    return this.store
      .collection('reservations', (ref) =>
        ref
          .where('hotelId', '==', propertyId)
          .where('status', '<=', ReservationStatus.CHECKEDOUT)
      )
      .valueChanges();
  }

  async deleteConversation(reservationId) {
    this.store
      .collection('reservations', (ref) =>
        ref.where('reservationId', '==', reservationId)
      )
      .get()
      .pipe(take(1));
  }

  private getConversations(propertyId, reservationIds) {
    if (!reservationIds.length) {
      return of([]);
    }
    return this.store
      .collection('messages', (ref) =>
        ref
          .where('hotelId', '==', propertyId)
          .where('reservationId', 'in', reservationIds)
          .orderBy('createdAt')
      )
      .valueChanges({ idField: 'uuid' });
  }
}
