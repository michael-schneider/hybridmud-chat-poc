import { Component, OnInit, OnDestroy } from '@angular/core';

import { MudService } from './mud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  messages = [];
  connection;
  message;

  constructor(private mudService: MudService) { }

  sendMessage() {
    this.mudService.sendMessage(this.message);
    this.message = '';
  }

  ngOnInit() {
    this.connection = this.mudService.getMessages().subscribe(message => {
      this.messages.push(message);
    });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
