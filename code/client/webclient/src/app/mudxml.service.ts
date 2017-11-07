import { Injectable, OnDestroy } from '@angular/core';
import { MudMessage, MessageType } from './mudmessage';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { WebsocketService } from './websocket.service';

@Injectable()
export class MudxmlService implements OnDestroy {
  private readonly websocketSubscription: Subscription;
  private readonly subject: Subject<MudMessage> = new Subject();

  constructor(private websocketService: WebsocketService) {
    this.websocketSubscription = websocketService.getWebsocketObservable().subscribe(message => this.receiveMessage(message));
  }

  private receiveMessage(message: string) {
    let messageType: MessageType;
    let messageContent: string;

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(message, 'text/xml');

    if (xmlDoc.documentElement.tagName === 'message') {
      const type = xmlDoc.documentElement.getAttribute('type');
      if (type === null || type === 'information') {
        messageType = MessageType.INFORMATION;
      } else if (type === 'success') {
        messageType = MessageType.SUCCESS;
      } else if (type === 'error') {
        messageType = MessageType.ERROR;
      }
      messageContent = xmlDoc.documentElement.textContent;
    }

    const mudMessage: MudMessage = {
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
