import { Injectable } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';

import { MudMessage, MessageType } from '../shared/mud-message';
import { MudxmlService } from '../shared/mudxml.service';


@Injectable()
export class CurrentUserService {
  private username: string;
  private id: string;

  private readonly mudxmlSubscription: Subscription;

  constructor(private mudxmlService: MudxmlService) {
    this.mudxmlSubscription = mudxmlService.getMudxmlObservable().filter((message) => message.domain === 'login')
      .subscribe(message => this.receiveMessage(message));
  }

  public isLoggedIn(): boolean {
    return this.id && this.id.length >= 0;
  }

  private receiveMessage(message: MudMessage) {
    if (message.type === MessageType.SUCCESS) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(message.message, 'text/xml');
      this.username = xmlDoc.getElementsByTagName('user')[0].childNodes[0].nodeValue;
      this.id = xmlDoc.getElementsByTagName('user')[0].getAttribute('id');
    }
  }
}
