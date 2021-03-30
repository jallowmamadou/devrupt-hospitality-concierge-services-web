import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ApiServiceService } from './api-service.service';
import { mergeMap, pluck, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ReservationStatus } from './apaleo-booking.service';
import { TwilioService } from './twilio.service';
import { AngularFireMessaging } from '@angular/fire/messaging';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  public collection = this.store.collection('messages', (ref) =>
    ref.where('reservationId', '==', 'YWOFCSVH-1').orderBy('createdAt')
  );
  public messages$ = this.collection.valueChanges({ idField: 'uuid' });

  constructor(
    private store: AngularFirestore,
    private storage: Storage,
    private api: ApiServiceService,
    private twilioService: TwilioService,
    private afMessaging: AngularFireMessaging
  ) {}

  findProperty(propertyId: string) {
    return this.api.get(`properties/${propertyId}`);
  }

  propertyExists(propertyId: string): Observable<boolean> {
    return this.api.get(`properties/${propertyId}/exists`).pipe(pluck('body'));
  }

  startInstallation() {
    return this.api.post('install').toPromise();
  }

  async deleteConversation(reservationId) {
    return this.store.collection('reservations').doc(reservationId).update({
      status: ReservationStatus.ARCHIVED,
    });
  }

  sendNotification(
    reservationId: string,
    message: string = 'New message sent'
  ) {
    return this.api.post('notifications/publish', {
      reservationId,
      message,
    });
  }

  getReservationFolios(reservationId: string) {
    return this.api.get(`reservations/${reservationId}/folios`);
  }

  checkout(reservationId: string) {
    return this.api.post(`reservations/${reservationId}/checkout`).toPromise();
  }

  async saveSettings(propertyId: string, settings: any) {
    const saved = await this.store
      .collection('hotel_settings')
      .doc(propertyId)
      .set(settings);

    if (settings.messageNotification) {
      const token = await this.afMessaging.requestToken.toPromise();
      return this.afMessaging.requestToken.pipe(take(1)).subscribe(
        async (token) => {
          return await this.saveNotificationPermission(token, propertyId);
        },
        (error) => {
          console.error(error);
        }
      );
    }

    return await this.afMessaging.getToken
      .pipe(mergeMap((token) => this.afMessaging.deleteToken(token)))
      .toPromise();
  }

  getSettings(propertyId: string) {
    return this.store
      .collection('hotel_settings')
      .doc(propertyId)
      .valueChanges();
  }

  async setUpPhone(settings: any) {
    if (settings.incomingCalls) {
      const response: any = await this.api
        .post('voice/token', {
          clientId: 'Client:BER',
        })
        .toPromise();

      this.twilioService.setupDevice(response.token).listenToStates();
    }
  }

  applySettings(settings) {
    this.setUpPhone(settings).then((phone) => {
    });
    return of([]);
  }


  private async saveNotificationPermission(token: string, propertyId: string) {
    return await this.store
      .collection('notification_tokens')
      .doc(propertyId)
      .set({
        token: token,
      });
  }
}
