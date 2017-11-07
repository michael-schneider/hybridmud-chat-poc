import { Component, OnInit, OnDestroy, ViewChildren, ViewChild, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from '../websocket.service';
import { Subscription } from 'rxjs/Subscription';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren('messages') messages: QueryList<any>;
  @ViewChild('content') content: ElementRef;

  private readonly loginForm: FormGroup;
  private readonly websocketSubscription: Subscription;
  private serverMessages: string[] = [];

  constructor(private websocketService: WebsocketService, formBuilder: FormBuilder, private router: Router) {
    this.loginForm = formBuilder.group({
      'username': ['', Validators.required]
    });
    this.websocketSubscription = websocketService.getWebsocketObservable().subscribe(message => this.receiveMessage(message));
  }

  ngAfterViewInit() {
    this.messages.changes.subscribe(this.scrollToBottom);
  }

  private scrollToBottom = () => {
    try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch (err) { }
  }

  public ngOnInit() {
  }

  private receiveMessage(message: string) {
    console.log('Got a message from websocket:');
    console.log(message);
    this.serverMessages.push(message);
  }

  public ngOnDestroy() {
    this.websocketSubscription.unsubscribe();
  }

  onSubmit({ username }: { username: string }): void {
    console.log('you submitted value: ', username);
    if (username) {
      this.websocketService.send(username);
    }
    // this.router.navigate(['/chat/']);
  }

}
