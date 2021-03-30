import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
import { AdminMessageService } from './services/admin-message.service';
import { ConversationComponent } from './components/conversation/conversation.component';
import { ChatsPage } from './components/chats/chats.page';
import { OptionsComponent } from './components/options/options.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TwilioService } from '../services/twilio.service';
import { VoiceCallComponent } from './components/voice-call/voice-call.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AdminPageRoutingModule],
  declarations: [
    AdminPage,
    ConversationComponent,
    ChatsPage,
    OptionsComponent,
    SettingsComponent,
    VoiceCallComponent
  ],
  providers: [AdminMessageService, TwilioService],
})
export class AdminPageModule {}
