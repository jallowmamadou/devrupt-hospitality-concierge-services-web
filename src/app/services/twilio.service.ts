import { Injectable } from '@angular/core';

import { Device } from 'twilio-client';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TwilioService {
  public connection: any;
  public activeCall$ = new Subject();
  public caller: any;
  private device: any;

  constructor() {}

  setupDevice(token) {
    console.log('we have token', { token });
    this.device = new Device(token, {
      fakeLocalDTMF: true,
      enableRingingState: true,
    });

    return this;
  }

  listenToStates() {
    console.log('starting device');
    this.device.on('ready', (device) => {
      this.device = device;
      console.log('clientname: ', device._clientName);
    });

    // Device.on('incoming', (connection) => {});
    this.device.on('incoming', (connection) => {
      this.connection = connection;
      console.log(connection.customParameters.get('fullName'));
      this.caller = {
        reservationId: connection.customParameters.get('reservationId'),
        fullName: connection.customParameters.get('fullName'),
      };
      this.activeCall$.next({
        params: this.caller,
        status: this.connection.status,
      });
    });

    this.device.on('disconnect', () => {
      this.activeCall$.next({
        params: this.caller,
        status: this.connection.status,
      });
    });
  }

  reject() {
    this.connection.reject();

    this.activeCall$.next({
      params: this.caller,
      status: 'closed',
    });
  }

  end() {
    this.connection.disconnect();

    this.activeCall$.next({
      params: this.caller,
      status: 'closed',
    });
  }

  accept() {
    this.connection.accept();

    this.activeCall$.next({
      params: this.caller,
      status: 'open',
    });
  }
}
