import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  public propertyId: string;
  public messageNotification: boolean = false;
  public settings$;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.propertyId = this.route.snapshot.queryParams.propertyId;
    this.adminService
      .getSettings(this.route.snapshot.queryParams.propertyId)
      .subscribe(
        (settings: any) =>
          (this.messageNotification = settings?.messagingNotification || false)
      );
  }

  async saveSettings() {
    console.log('saving settings');
    await this.adminService.saveSettings(
      this.route.snapshot.queryParams.propertyId,
      {
        name: this.route.snapshot.data.property.name.en,
        messagingNotification: this.messageNotification,
        incomingCalls: false,
        phoneNumber: 'none',
        clientId: 'none',
      }
    );
  }

  ngOnDestroy(): void {
    this.settings$.unsubscribe();
  }
}
