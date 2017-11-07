import { Component, OnInit, ViewChild, QueryList, ElementRef, ViewChildren, AfterViewInit, OnDestroy } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-servermessages',
  templateUrl: './servermessages.component.html',
  styleUrls: ['./servermessages.component.css'],
})
export class ServermessagesComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren('messages') messages: QueryList<any>;
  @ViewChild('content') content: ElementRef;
  private serverMessages: string[] = [];
  private readonly websocketSubscription: Subscription;

  constructor(private websocketService: WebsocketService) {
    this.websocketSubscription = websocketService.getWebsocketObservable().subscribe(message => this.receiveMessage(message));
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
  private receiveMessage(message: string) {
    this.serverMessages.push(message);
  }

  public ngOnDestroy() {
    this.websocketSubscription.unsubscribe();
  }

}
