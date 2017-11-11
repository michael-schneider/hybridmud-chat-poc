import { Injectable, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

import { WebsocketService } from './websocket.service';
import { MudMessage, MessageType } from './mudmessage';
import { environment } from '../../environments/environment';
const CHAT_URL = environment.wsUrl;


@Injectable()
export class MudxmlService implements OnDestroy {
  private readonly websocketSubscription: Subscription;
  private readonly subject: Subject<MudMessage> = new Subject();

  constructor(private websocketService: WebsocketService) {
    this.websocketSubscription = websocketService.getWebsocketObservable().subscribe(message => this.receiveMessage(message),
      error => this.error(error));
  }

  private receiveMessage(message: string) {
    console.log('Mudxml Service, the server says: ' + message);
    let messageType: MessageType;

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(message, 'text/xml');

    const messageDomain = xmlDoc.documentElement.tagName.toLowerCase();
    const xmlTypeAttribute = xmlDoc.documentElement.getAttribute('type');

    if (xmlTypeAttribute === 'success') {
      messageType = MessageType.SUCCESS;
    } else if (xmlTypeAttribute === 'error') {
      messageType = MessageType.ERROR;
    } else {
      messageType = MessageType.INFORMATION;
    }
    const mudMessage: MudMessage = {
      domain: messageDomain,
      type: messageType,
      message: message,
      messageText: xmlDoc.documentElement.textContent
    };
    this.subject.next(mudMessage);
  }

  // Yes, that is the official way. An Error finishes the stream.
  // https://stackoverflow.com/questions/41827371/how-do-i-throw-an-error-on-a-behaviour-subject-and-continue-the-stream
  private error(error: Error) {
    const mudMessage: MudMessage = {
      domain: 'server',
      type: MessageType.ERROR,
      message: '<server type="error">Problem with websocket ' + CHAT_URL + '.</server>',
      messageText: 'Problem with websocket ' + CHAT_URL + '.'
    };
    this.subject.next(mudMessage);
  }

  public send(data: string) {
    this.websocketService.send(data);
  }

  public getMudxmlObservable() {
    return this.subject.asObservable();
  }

  public ngOnDestroy() {
    this.websocketSubscription.unsubscribe();
  }
}
