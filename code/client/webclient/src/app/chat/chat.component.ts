import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../shared/websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private message = 'Hello Hell';

  constructor() {

  }

  ngOnInit() {
  }


  sendMsg() {
    // console.log('new message from client to websocket: ', this.message);
    // this.mudService.messages.next(this.message);
    // this.message = '';
  }

}
