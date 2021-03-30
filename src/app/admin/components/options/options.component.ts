import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AdminService } from '../../../services/admin.service';
import { ReservationStatus } from '../../../services/apaleo-booking.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent {
  @Input() reservationId: string;
  @Input() propertyId: string;

  constructor(
    public popoverCtrl: PopoverController,
    private adminService: AdminService,
    private router: Router
  ) {}

  async close() {
    await this.popoverCtrl.dismiss();
  }

  async deleteConversation() {
    await this.adminService.deleteConversation(this.reservationId);

    await this.close();

    await this.router.navigateByUrl(
      `/admin/chats?propertyId=${this.propertyId}`
    );
  }
}
