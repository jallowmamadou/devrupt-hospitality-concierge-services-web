import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AdminMessageService } from '../../services/admin-message.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IonContent, PopoverController } from '@ionic/angular';
import { OptionsComponent } from '../options/options.component';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit {
  message: string;
  public messages$: Observable<any[]>;
  adminConversations: string = '';
  @ViewChild(IonContent) content: IonContent;
  public reservation: any = {};

  constructor(
    private route: ActivatedRoute,
    private messageService: AdminMessageService,
    private popover: PopoverController,
    private adminService: AdminService
  ) {}

  async sendMessage(event) {
    event.preventDefault();

    await this.messageService.sendMessage(
      this.message,
      this.route.snapshot.params.reservationId,
      this.route.snapshot.queryParams['propertyId']
    );

    setTimeout(async () => {
      await this.content.scrollToBottom(300);
    }, 300);

    await this.adminService
      .sendNotification(this.route.snapshot.params.reservationId, this.message)
      .toPromise();

    this.message = null;
  }

  ngOnInit(): void {
    this.reservation = this.route.snapshot.data.reservation;

    this.adminConversations = `/admin/chats?propertyId=${this.route.snapshot.queryParams['propertyId']}`;
    this.messages$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.messageService.messages(params.get('reservationId'))
      )
    );
  }

  ionViewDidEnter() {
    setTimeout(async () => {
      this.content.scrollToBottom(200).then();
    }, 200);
  }

  navigateTo(reservationI: string) {
    window.parent.postMessage(
      JSON.stringify({
        type: 'navigate',
        path: 'reservation-details',
        context: '$CURRENT_PROPERTY',
        id: reservationI,
      }),
      '*'
    );
  }

  notify() {
    window.parent.postMessage(
      JSON.stringify({
        type: 'notification',
        title: 'apaleo',
        content: 'test',
        notificationType: 'success',
      }),
      '*'
    );
  }

  async presentMore(event: MouseEvent, reservationId) {
    const popover = await this.popover.create({
      component: OptionsComponent,
      event,
      translucent: true,
      componentProps: {
        reservationId: reservationId,
        propertyId: this.route.snapshot.queryParams['propertyId'],
      },
      showBackdrop: false,
    });

    return await popover.present();
  }
}
