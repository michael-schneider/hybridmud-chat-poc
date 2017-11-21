import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';

import { MudxmlService } from '../../shared/mudxml.service';
import { MudMessage } from '../../shared/mud-message';
import { User } from '../../shared/user';
import { trigger, state, style, transition, animate, group } from '@angular/animations';
import { CurrentUserService } from '../../shared/current-user.service';

@Component({
  selector: 'app-users-online',
  templateUrl: './users-online.component.html',
  styleUrls: ['./users-online.component.css'],
  animations: [
    trigger('userChange', [
      transition(':enter', [
        group([
          style({ height: 0 }),
          animate('200ms ease'),
          style({ transform: 'scale(0)' }),
          animate('200ms 200ms ease-in')
        ])
      ]),
      transition(':leave', [
        group([
          animate('200ms ease-out', style({ transform: 'scale(0)' })),
          style({ height: '*' }),
          animate('200ms 200ms ease', style({ height: 0 }))
        ])
      ])
    ])
  ]
})
export class UsersOnlineComponent implements OnInit, OnDestroy {
  private usersOnline: User[] = [];
  private readonly mudxmlSubscription: Subscription;
  private readonly currentUser: User;
  private directMessageRecipient: User;

  constructor(private mudxmlService: MudxmlService, private currentUserService: CurrentUserService) {
    this.mudxmlSubscription = mudxmlService.getMudxmlObservable().filter((message) => message.domain === 'users')
      .subscribe((message) => this.receiveMessage(message));

    this.currentUser = this.currentUserService.getCurrentUser();
  }

  ngOnInit() {
    this.mudxmlService.send('/who');
  }

  public ngOnDestroy() {
    this.mudxmlSubscription.unsubscribe();
  }

  private receiveMessage(message: MudMessage) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(message.message, 'text/xml');

    const allUsers = xmlDoc.getElementsByTagName('user');
    for (let i = 0; i < allUsers.length; i++) {
      const xmlUser = allUsers[i];
      const username = xmlUser.childNodes[0].nodeValue;
      const userId = xmlUser.getAttribute('id');
      const user: User = {
        userId: userId,
        username: username,
      };

      if (message.type === 'list' || message.type === 'login') {
        this.userLogin(xmlUser, user, message.type);
      } else if (message.type === 'logout') {
        this.userLogout(xmlUser, user);
      }
    }
  }

  private directMessageTo(userOnline: User) {
    this.directMessageRecipient = userOnline;
  }

  private directMessageEnd() {
    this.directMessageRecipient = null;
  }

  private userLogout(xmlUser: Element, user: User) {
    this.usersOnline = this.usersOnline.filter(userToRemove => {
      return userToRemove.userId !== user.userId;
    });
    const mudMessage: MudMessage = {
      domain: 'chat',
      type: 'status',
      message: '<chat type="status">' + xmlUser.outerHTML + '<message>has logged out.</message></chat>',
    };
    this.mudxmlService.next(mudMessage);
  }

  private userLogin(xmlUser: Element, user: User, messageType: string) {
    this.usersOnline.push(user);
    this.makeUsersOnlineUnique();
    this.sortUsersOnline();
    this.removeCurrentUserFromAllUsers();
    if (messageType === 'login') {
      const mudMessage: MudMessage = {
        domain: 'chat',
        type: 'status',
        message: '<chat type="status">' + xmlUser.outerHTML + '<message>has logged in.</message></chat>',
      };
      this.mudxmlService.next(mudMessage);
    }

  }

  private makeUsersOnlineUnique() {
    const userIds = new Set<string>();
    this.usersOnline = this.usersOnline.filter(entry => {
      if (userIds.has(entry.userId)) {
        return false;
      }
      userIds.add(entry.userId);
      return true;
    });
  }

  private sortUsersOnline() {
    this.usersOnline.sort((a, b) => {
      return a.username.localeCompare(b.username);
    });
  }

  private removeCurrentUserFromAllUsers() {
    this.usersOnline = this.usersOnline.filter(user => {
      return user.userId !== this.currentUser.userId;
    });
  }
}
