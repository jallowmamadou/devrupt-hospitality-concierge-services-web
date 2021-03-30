import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  public collection = this.store.collection('messages', (ref) =>
    ref
      .where(
        'reservationId',
        '==',
        window.localStorage.getItem('reservationId')
      )
      .orderBy('createdAt')
  );
  public messages$ = this.collection.valueChanges({ idField: 'uuid' });

  constructor(private store: AngularFirestore, private storage: Storage) {}

  async sendMessage(message: string) {
    const guest = await this.storage.get('guest');
    const hotel = await this.storage.get('property');
    return await this.store.collection('messages').add({
      text: message,
      createdAt: new Date(),
      hotelId: hotel?.id || window.localStorage.getItem('propertyId'),
      reservationId: window.localStorage.getItem('reservationId'),
      sender: {
        type: 'GUEST',
        ...guest,
      },
    });
  }

  async saveNotificationPermission(token: string, reservationId: string) {
    return await this.store
      .collection('notification_tokens')
      .doc(reservationId)
      .set({
        token: token,
      });
  }
}
