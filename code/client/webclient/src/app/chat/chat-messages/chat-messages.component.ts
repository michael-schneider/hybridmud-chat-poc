import { Component, OnInit, ViewChild, QueryList, ElementRef, ViewChildren, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';

import { MudxmlService } from '../../shared/mudxml.service';
import { MudMessage } from '../../shared/mud-message';

import { ChatMessage, ChatMessageType } from './chat-message';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css']
})
export class ChatMessagesComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren('messages') messages: QueryList<any>;
  @ViewChild('content') content: ElementRef;
  public chatMessages: ChatMessage[] = [];
  private readonly mudxmlSubscription: Subscription;
  private readonly chatMessageType = ChatMessageType;

  constructor(private mudxmlService: MudxmlService) {
    this.mudxmlSubscription = mudxmlService.getMudxmlObservable().filter((message) => message.domain === 'chat')
      .subscribe((message) => this.receiveMessage(message));
    this.mudxmlSubscription = mudxmlService.getMudxmlObservable().filter((message) => message.domain === 'users')
      .subscribe((message) => this.receiveUsersMessage(message));
    this.mudxmlSubscription = mudxmlService.getMudxmlObservable().filter((message) => message.type === 'error')
      .subscribe((message) => this.receiveErrorMessage(message));
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.messages.changes.subscribe(this.scrollToBottom);
  }

  private scrollToBottom = () => {
    this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
  }

  receiveErrorMessage(message: MudMessage) {
    const chatMessage: ChatMessage = {
      userId: null,
      username: null,
      message: message.message.replace(/<[^>]*>/g, ''),
      type: ChatMessageType.ERROR
    };
    console.log(chatMessage);
    this.chatMessages.push(chatMessage);
  }

  receiveUsersMessage(message: MudMessage) {
    if (message.type === 'login' || message.type === 'logout') {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(message.message, 'text/xml');

      const username = xmlDoc.getElementsByTagName('user')[0].childNodes[0].nodeValue;
      const userId = xmlDoc.getElementsByTagName('user')[0].getAttribute('id');

      const chatMessage: ChatMessage = {
        userId: userId,
        username: username,
        message: '',
        type: message.type === 'login' ? ChatMessageType.LOGIN : ChatMessageType.LOGOUT
      };
      this.chatMessages.push(chatMessage);
    }
  }

  private receiveMessage(message: MudMessage) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(message.message, 'text/xml');

    const username = xmlDoc.getElementsByTagName('user')[0].childNodes[0].nodeValue;
    const userId = xmlDoc.getElementsByTagName('user')[0].getAttribute('id');
    const xmlMessage = xmlDoc.getElementsByTagName('message')[0].childNodes[0];
    if (xmlMessage === undefined) {
      // No message;
      return;
    }
    const chat = xmlMessage.nodeValue;
    let type: ChatMessageType = null;
    switch (xmlDoc.documentElement.getAttribute('type')) {
      case 'status': type = ChatMessageType.STATUS;
        break;
      case 'tell':
        const direction = xmlDoc.documentElement.getAttribute('direction');
        if (direction === 'from') {
          type = ChatMessageType.TELLFROM;
        }
        if (direction === 'to') {
          type = ChatMessageType.TELLTO;
        }
        if (type === null) {
          console.error('ERROR: Do not understand direction in ' + message.message + '.');
          return;
        }
        break;
      default: type = ChatMessageType.CHAT;
    }

    const chatMessage: ChatMessage = {
      userId: userId,
      username: username,
      message: chat,
      type: type
    };
    this.chatMessages.push(chatMessage);
  }

  public ngOnDestroy() {
    this.mudxmlSubscription.unsubscribe();
  }
}
