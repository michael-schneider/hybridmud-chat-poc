
import {filter} from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';


import { WebsocketService } from './shared/websocket.service';
import { CurrentUserService } from './shared/current-user.service';
import { MudxmlService } from './shared/mudxml.service';
import { MudMessage } from './shared/mud-message';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnDestroy {
  private readonly mudxmlSubscription: Subscription;

  public constructor(private websocketService: WebsocketService, private mudxmlService: MudxmlService,
    private currentUserService: CurrentUserService, private router: Router) {
    this.mudxmlSubscription = this.mudxmlService.getMudxmlObservable().pipe(filter((message) => message.domain === 'init'))
      .subscribe((message) => this.restart(message));

  }

  public restart(message: MudMessage) {
    // In case we are out of sync with the server
    if (this.router.url !== '/') {
      window.location.href = '/';
    }
  }

  public ngOnDestroy() {
    this.mudxmlSubscription.unsubscribe();
    this.websocketService.close();
  }
}
