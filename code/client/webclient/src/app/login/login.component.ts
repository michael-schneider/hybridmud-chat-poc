import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MudxmlService } from '../mudxml.service';
import { Subscription } from 'rxjs/Subscription';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { MudMessage } from '../mudmessage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

  private readonly loginForm: FormGroup;
  private readonly mudxmlSubscription: Subscription;

  constructor(private websocketService: MudxmlService, formBuilder: FormBuilder, private router: Router) {
    this.loginForm = formBuilder.group({
      'username': ['', Validators.required]
    });
    this.mudxmlSubscription = websocketService.getMudxmlObservable().subscribe(message => this.receiveMessage(message));
  }

  public ngOnInit() {
  }

  private receiveMessage(message: MudMessage) {
    // console.log('Got a message from websocket:');
    // console.log(message);

  }

  public ngOnDestroy() {
    this.mudxmlSubscription.unsubscribe();
  }

  onSubmit({ username }: { username: string }): void {
    console.log('you submitted value: ', username);
    if (username) {
      this.websocketService.send(username);
    }
    // this.router.navigate(['/chat/']);
  }

}
