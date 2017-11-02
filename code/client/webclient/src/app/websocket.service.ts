import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../environments/environment';

const CHAT_URL = environment.wsUrl;

@Injectable()
export class WebsocketService {
  private webSocket: WebSocket;
  private listener: EventEmitter<any> = new EventEmitter();

  public constructor() {
      this.webSocket = new WebSocket(CHAT_URL);
      this.webSocket.onopen = event => {
          this.listener.emit({'type': 'open', 'data': event});
      };
      this.webSocket.onclose = event => {
          this.listener.emit({'type': 'close', 'data': event});
      };
      this.webSocket.onmessage = event => {
          this.listener.emit({'type': 'message', 'data': JSON.parse(event.data)});
      };
  }

  public send(data: string) {
      this.webSocket.send(data);
  }

  public close() {
      this.webSocket.close();
  }

  public getEventListener() {
      return this.listener;
  }
}
