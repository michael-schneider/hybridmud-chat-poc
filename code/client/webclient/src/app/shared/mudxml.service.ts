import { Injectable, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

import { WebsocketService } from './websocket.service';
import { MudMessage, MessageType } from './mudmessage';

@Injectable()
export class MudxmlService implements OnDestroy {
  private readonly websocketSubscription: Subscription;
  private readonly subject: Subject<MudMessage> = new Subject();

  constructor(private websocketService: WebsocketService) {
    this.websocketSubscription = websocketService.getWebsocketObservable().subscribe(message => this.receiveMessage(message),
      error => this.subject.error(error));
  }

  private receiveMessage(message: string) {
    console.log("Server says: " + message);
    let messageType: MessageType;
    let messageContent: string;
    
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
    messageContent = xmlDoc.documentElement.textContent;
    const mudMessage: MudMessage = {
      domain: messageDomain,
      type: messageType,
      message: messageContent
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
