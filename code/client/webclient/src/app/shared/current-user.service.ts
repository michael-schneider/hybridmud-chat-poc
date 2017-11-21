import { Injectable } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';

import { MudMessage } from '../shared/mud-message';
import { MudxmlService } from '../shared/mudxml.service';
import { User } from './user';


@Injectable()
export class CurrentUserService {
  private currentUser: User;

  private readonly mudxmlSubscription: Subscription;

  constructor(private mudxmlService: MudxmlService) {
    this.mudxmlSubscription = mudxmlService.getMudxmlObservable().filter((message) => message.domain === 'login')
      .subscribe(message => this.receiveMessage(message));
  }

  public isLoggedIn(): boolean {
    return this.currentUser !== undefined && this.currentUser.userId && this.currentUser.userId.length >= 0;
  }

  public getCurrentUser(): User {
    return this.currentUser;
  }

  private receiveMessage(message: MudMessage) {
    if (message.type === 'success') {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(message.message, 'text/xml');
      const username = xmlDoc.getElementsByTagName('user')[0].childNodes[0].nodeValue;
      const userId = xmlDoc.getElementsByTagName('user')[0].getAttribute('id');
      this.currentUser = {
        userId: userId,
        username: username
      };
    }
  }
}
