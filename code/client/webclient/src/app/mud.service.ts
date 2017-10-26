import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { WebsocketService } from './websocket.service';
import { environment } from '../environments/environment';

const CHAT_URL = environment.wsUrl;

@Injectable()
export class MudService {
  public messages: Subject<String>;

  constructor(websocketService: WebsocketService) {
    this.messages = <Subject<String>>websocketService
      .connect(CHAT_URL)
      .map((response: MessageEvent): String => {
        return response.data;
      });
  }
}
