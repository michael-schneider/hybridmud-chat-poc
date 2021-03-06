
import {filter} from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

import { Subscription } from 'rxjs';


import { MudMessage } from '../shared/mud-message';
import { MudxmlService } from '../shared/mudxml.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

  public readonly loginForm: FormGroup;

  private readonly mudxmlSubscription: Subscription;
  private serverError = '';

  constructor(private mudxmlService: MudxmlService, formBuilder: FormBuilder, private router: Router) {
    this.loginForm = formBuilder.group({
      'username': ['', Validators.required]
    });
    this.mudxmlSubscription = mudxmlService.getMudxmlObservable().pipe(filter((message) => message.domain === 'login'))
      .subscribe(message => this.receiveMessage(message));
  }

  public ngOnInit() {
  }

  private receiveMessage(message: MudMessage) {
    if (message.type === 'error') {
      this.loginForm.controls['username'].setErrors({ 'server': true });
      this.serverError = message.message.replace(/<[^>]*>/g, '');
    }
    if (message.type === 'success') {
      this.router.navigate(['/chat/']);
    }
  }

  public ngOnDestroy() {
    this.mudxmlSubscription.unsubscribe();
  }

  public onSubmit({ username }: { username: string }): void {
    this.loginForm.controls['username'].markAsDirty();
    if (username && this.loginForm.valid) {
      this.mudxmlService.send(username);
    }
  }

}
