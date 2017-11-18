import { Component, OnInit } from '@angular/core';

import { MudxmlService } from '../shared/mudxml.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private message = '';

  constructor(private mudxmlService: MudxmlService) {

  }

  ngOnInit() {
  }

  logout() {
    this.mudxmlService.send('/bye');
    window.location.href = '/';
  }

  sendMessage() {
    let messageToSend = this.message;
    if (messageToSend.charAt(0) === '/') {
      messageToSend = '\\' + messageToSend;
    }
    this.mudxmlService.send(messageToSend);
    this.message = '';
  }

}
