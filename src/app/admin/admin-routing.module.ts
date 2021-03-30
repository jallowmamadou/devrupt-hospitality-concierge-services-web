import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';
import { PropertyResolver } from '../resolvers/property.resolver';
import { ChatsPage } from './components/chats/chats.page';
import { ConversationComponent } from './components/conversation/conversation.component';
import { ReservationResolver } from '../resolvers/reservation.resolver';
import { SettingsComponent } from './components/settings/settings.component';
import { VoiceCallComponent } from './components/voice-call/voice-call.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPage,
    children: [
      {
        path: 'chats',
        resolve: {
          property: PropertyResolver,
        },
        component: ChatsPage,
      },
      {
        path: 'settings',
        resolve: {
          property: PropertyResolver,
        },
        component: SettingsComponent,
      },
      {
        path: 'voice/call',
        // resolve: {
        //   reservation: ReservationResolver,
        // },
        component: VoiceCallComponent,
      },
      {
        path: 'chats/conversations/:reservationId',
        resolve: {
          reservation: ReservationResolver,
        },
        component: ConversationComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: '/admin/chats',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
