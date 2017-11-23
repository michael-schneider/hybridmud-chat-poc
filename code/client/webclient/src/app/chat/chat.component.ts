import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, group } from '@angular/animations';

import { MudxmlService } from '../shared/mudxml.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../shared/user';
import { DirectMessageUserService } from './direct-message-user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  animations: [
    trigger('directMessage', [
      transition(':enter', [
        group([
          style({ transform: 'scale(0)' }),
          animate('200ms ease-in')
        ])
      ]),
      transition(':leave', [
        group([
          animate('200ms ease-out', style({ transform: 'scale(0)' })),
        ])
      ])
    ])
  ]
})
export class ChatComponent implements OnInit {

  public directMessageRecipient: User = null;
  public message = '';

  private directMessageUserSubscription: Subscription;

  constructor(private mudxmlService: MudxmlService, private directMessageUserService: DirectMessageUserService) {
    this.directMessageUserSubscription = directMessageUserService.getDirectMessageUserObservable()
      .subscribe((user) => this.directMessageRecipient = user);
  }

  ngOnInit() {
  }

  logout() {
    this.mudxmlService.send('/bye');
    window.location.href = '/';
  }

  sendMessage() {
    let messageToSend = this.message;
    if (this.directMessageRecipient) {
      messageToSend = '/tell ' + this.directMessageRecipient.username + ' ' + messageToSend;
    } else {
      if (messageToSend.charAt(0) === '/') {
        messageToSend = '\\' + messageToSend;
      }
    }
    this.mudxmlService.send(messageToSend);
    this.message = '';
  }

}
