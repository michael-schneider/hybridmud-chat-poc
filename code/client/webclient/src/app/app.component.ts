import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from './shared/websocket.service';
import { CurrentUserService } from './shared/current-user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  public constructor(private websocketService: WebsocketService, private currentUserService: CurrentUserService) { }

  public ngOnInit() {
  }

  public ngOnDestroy() {
    this.websocketService.close();
  }
}
