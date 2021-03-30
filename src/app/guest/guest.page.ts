import { Component, OnInit } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { MessageService } from '../services/message.service';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.page.html',
  styleUrls: ['./guest.page.scss'],
})
export class GuestPage implements OnInit {
  public messages$: Observable<{}>;

  constructor(
    private afMessaging: AngularFireMessaging,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.afMessaging.requestToken.pipe(take(1)).subscribe(
      async (token) => {
        await this.messageService.saveNotificationPermission(
          token,
          window.localStorage.getItem('reservationId')
        );
      },
      (error) => {
        console.error(error);
      }
    );

    this.messages$ = this.afMessaging.messages;
  }
}
