import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { environment } from '../environments/environment';

@Injectable()
export class MudService {
  private readonly url = environment.wsUrl;

  getMessages() {

    const ws = new WebSocket('ws://' + window.location.hostname + ':' + window.location.port, 'sinedata');

    ws.onmessage = function (e: MessageEvent) {

      return e.data;

    };
  }

  /*private socket;

  sendMessage(message) {
    this.socket.emit('add-message', message);
  }

  getMessages() {
    const observable = new Observable(observer => {
      this.socket = io('http://www.syncic.com:6666');
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }*/

}
