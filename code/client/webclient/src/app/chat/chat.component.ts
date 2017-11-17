import { Component, OnInit } from '@angular/core';

import { MudxmlService } from '../shared/mudxml.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private message = 'Hello Hell';

  constructor(private mudxmlService: MudxmlService) {

  }

  ngOnInit() {
  }

  logout() {
    this.mudxmlService.send('/bye');
    window.location.href = '/';
  }

  sendMsg() {
    // console.log('new message from client to websocket: ', this.message);
    // this.mudService.messages.next(this.message);
    // this.message = '';
  }

}
