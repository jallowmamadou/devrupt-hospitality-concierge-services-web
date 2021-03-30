import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestPageRoutingModule } from './guest-routing.module';

import { GuestPage } from './guest.page';
import { HomeComponent } from './components/home/home.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, GuestPageRoutingModule, MatTableModule],
  declarations: [GuestPage, HomeComponent],
})
export class GuestPageModule {}
