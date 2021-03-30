import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestPage } from './guest.page';
import { HomeComponent } from './components/home/home.component';
import { ReservationResolver } from '../resolvers/reservation.resolver';

const routes: Routes = [
  {
    path: '',
    component: GuestPage,
    children: [
      {
        path: 'home',
        resolve: {
          reservation: ReservationResolver,
        },
        component: HomeComponent,
      },
      {
        path: '',
        redirectTo: '/guest/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/guest/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestPageRoutingModule {}
