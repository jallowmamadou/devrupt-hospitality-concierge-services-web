import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageService } from '../../../services/message.service';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent {
  message: string;
  public messages$: Observable<any[]>;
  @ViewChild(IonContent) content: IonContent;

  constructor(private messageService: MessageService) {
    this.messages$ = this.messageService.messages$;
  }

  async sendMessage(event = null) {
    await this.messageService.sendMessage(this.message);

    this.message = null;

    if (event) {
      event.preventDefault();
    }

    setTimeout(async () => {
      await this.content.scrollToBottom(300);
    }, 300);
  }

  ionViewDidEnter() {
    setTimeout(async () => {
      this.content.scrollToBottom(200).then();
    }, 200);
  }
}
