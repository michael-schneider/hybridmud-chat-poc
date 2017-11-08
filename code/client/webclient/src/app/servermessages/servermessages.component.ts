import { Component, OnInit, ViewChild, QueryList, ElementRef, ViewChildren, AfterViewInit, OnDestroy } from '@angular/core';
import { MudxmlService } from '../mudxml.service';
import { MudMessage, MessageType } from '../mudmessage';
import { Subscription } from 'rxjs/Subscription';
import { environment } from '../../environments/environment';

const CHAT_URL = environment.wsUrl;

@Component({
  selector: 'app-servermessages',
  templateUrl: './servermessages.component.html',
  styleUrls: ['./servermessages.component.css'],
})
export class ServermessagesComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren('messages') messages: QueryList<any>;
  @ViewChild('content') content: ElementRef;
  private serverMessages: string[] = [];
  private readonly mudxmlSubscription: Subscription;

  constructor(private mudxmlService: MudxmlService) {
    this.mudxmlSubscription = mudxmlService.getMudxmlObservable().subscribe(message => this.receiveMessage(message),
      error => this.error(error));
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.messages.changes.subscribe(this.scrollToBottom);
  }

  private scrollToBottom = () => {
    try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch (err) { }
  }

  private receiveMessage(message: MudMessage) {
    this.serverMessages.push(message.message);
  }

  private error(error: Error) {
    this.serverMessages.push('Error connecting to Server. Please make sure ' + CHAT_URL + ' is working.');
  }

  public ngOnDestroy() {
    this.mudxmlSubscription.unsubscribe();
  }

}
