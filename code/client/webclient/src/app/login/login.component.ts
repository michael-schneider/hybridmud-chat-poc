import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';

import { MudMessage, MessageType } from '../shared/mudmessage';
import { MudxmlService } from '../shared/mudxml.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

  private readonly loginForm: FormGroup;
  private readonly mudxmlSubscription: Subscription;
  private serverError = '';

  constructor(private mudxmlService: MudxmlService, formBuilder: FormBuilder, private router: Router) {
    this.loginForm = formBuilder.group({
      'username': ['', Validators.required]
    });
    this.mudxmlSubscription = mudxmlService.getMudxmlObservable().filter((message) => message.domain === 'login')
      .subscribe(message => this.receiveMessage(message));
  }

  public ngOnInit() {
  }

  private receiveMessage(message: MudMessage) {
    if (message.type === MessageType.ERROR) {
      this.loginForm.controls['username'].setErrors({ 'server': true });
      this.serverError = message.messageText;
    }
    if (message.type === MessageType.SUCCESS) {
      if (this.loginForm.valid) {
        this.serverError = '';
        this.router.navigate(['/chat/']);
      }
    }
  }

  public ngOnDestroy() {
    this.mudxmlSubscription.unsubscribe();
  }

  onSubmit({ username }: { username: string }): void {
    if (username && this.loginForm.valid) {
      this.mudxmlService.send(username);
    }
  }

}
