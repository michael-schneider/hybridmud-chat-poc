import { Component, OnInit, ViewChild, QueryList, ElementRef, ViewChildren, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';

import { MudxmlService } from '../../shared/mudxml.service';
import { MudMessage, MessageType } from '../../shared/mud-message';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css']
})
export class ChatMessagesComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren('messages') messages: QueryList<any>;
  @ViewChild('content') content: ElementRef;
  private chatMessages: string[] = [];
  private readonly mudxmlSubscription: Subscription;

  constructor(private mudxmlService: MudxmlService) {
    this.mudxmlSubscription = mudxmlService.getMudxmlObservable().filter((message) => message.domain === 'chat')
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
    console.log("CHAT:"+message.messageText);
    //this.chatMessages.push(message.messageText);
  }

  public ngOnDestroy() {
    this.mudxmlSubscription.unsubscribe();
  }
}
