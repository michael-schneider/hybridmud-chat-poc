import { Component, OnInit, OnDestroy } from '@angular/core';

import { WebsocketService } from './websocket.service';
import { MudService } from './mud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private message = 'Hello Hell';

  constructor(private mudService: MudService) {
    mudService.messages.subscribe(msg => {
      console.log('Response from websocket: ' + msg);
    });
  }

  sendMsg() {
    console.log('new message from client to websocket: ', this.message);
    this.mudService.messages.next(this.message);
    this.message = '';
  }
}
