import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from '../websocket.service';
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

export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private websocketService: WebsocketService, formBuilder: FormBuilder, private router: Router) {
    this.loginForm = formBuilder.group({
      'username': ['', Validators.required]
    });
  }

  public ngOnInit() {
    this.websocketService.getEventListener().subscribe(event => {
      if (event.type === 'message') {
        console.log(event.data);
      }
      if (event.type === 'close') {
        console.log('/The socket connection has been closed');
      }
      if (event.type === 'open') {
        console.log('/The socket connection has been established');
      }
    });
  }

  onSubmit({ username }: { username: string }): void {
    console.log('you submitted value: ', username);
    if (username) {
      this.websocketService.send(username);
    }
    // this.router.navigate(['/chat/']);
  }

}
