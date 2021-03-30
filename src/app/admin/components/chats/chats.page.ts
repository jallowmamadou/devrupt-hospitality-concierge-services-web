import { Component, OnInit } from '@angular/core';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AdminMessageService } from '../../services/admin-message.service';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
  public conversations$: Observable<any>;
  public settings$: Observable<any[]>;

  constructor(
    public route: ActivatedRoute,
    private messageService: AdminMessageService,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.adminService.startInstallation().then();

    this.settings$ = this.adminService
      .getSettings(this.route.snapshot.queryParams.propertyId)
      .pipe(switchMap(settings => this.adminService.applySettings(settings)))

    this.conversations$ = this.messageService
      .conversations(this.route.snapshot.queryParams['propertyId'])
      .pipe(
        map((messages: any[]) => {
          return messages.reduce((acc, curr) => {
            if (!Object.keys(acc).length) {
              acc = [];
            }

            const index = acc.findIndex(
              (message: any) => message.reservationId === curr.reservationId
            );

            if (index !== -1) {
              acc[index].data.push(curr);
            } else {
              acc.push({
                reservationId: curr.reservationId,
                guest: curr.sender,
                sender: curr.sender,
                data: [curr],
              });
            }

            return acc;
          }, Object.create(null));
        }),
        tap((conversations) => console.log(conversations))
      );
  }

  openSettings() {
    window.open(
      `${environment.settingsPage}?propertyId=${this.route.snapshot.queryParams['propertyId']}`,
      '_blank'
    );
  }
}
