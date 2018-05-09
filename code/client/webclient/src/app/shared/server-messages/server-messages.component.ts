import { Component, OnInit, ViewChild, QueryList, ElementRef, ViewChildren, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MudxmlService } from '../mudxml.service';
import { MudMessage } from '../mud-message';

@Component({
  selector: 'app-server-messages',
  templateUrl: './server-messages.component.html',
  styleUrls: ['./server-messages.component.css'],
})
export class ServerMessagesComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren('messages') messages: QueryList<any>;
  @ViewChild('content') content: ElementRef;
  public serverMessages: string[] = [];
  private readonly mudxmlSubscription: Subscription;

  constructor(private mudxmlService: MudxmlService) {
    this.mudxmlSubscription = mudxmlService.getMudxmlObservable()
      .subscribe((message) => this.receiveMessage(message));
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.messages.changes.subscribe(this.scrollToBottom);
  }

  private scrollToBottom = () => {
    this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
  }

  private receiveMessage(message: MudMessage) {
    this.serverMessages.push(message.message);
  }

  public ngOnDestroy() {
    this.mudxmlSubscription.unsubscribe();
  }

}
