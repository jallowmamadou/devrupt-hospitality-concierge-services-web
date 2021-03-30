import { Component, OnInit } from '@angular/core';
import { TwilioService } from '../../../services/twilio.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-voice-call',
  templateUrl: './voice-call.component.html',
  styleUrls: ['./voice-call.component.scss'],
})
export class VoiceCallComponent implements OnInit {
  public call$: Subject<any>;

  constructor(private twilioService: TwilioService) {}

  ngOnInit() {
    this.call$ = this.twilioService.activeCall$;
  }
}
