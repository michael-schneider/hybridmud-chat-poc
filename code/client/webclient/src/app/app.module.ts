import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { appRouting } from './app.routing';

import { WebsocketService } from './shared/websocket.service';
import { MudxmlService } from './shared/mudxml.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { ServerMessagesComponent } from './shared/server-messages/server-messages.component';
import { CurrentUserService } from './shared/current-user.service';
import { ChatMessagesComponent } from './chat/chat-messages/chat-messages.component';
import { EnsureLoginService } from './shared/ensure-login.service';
import { UsersOnlineComponent } from './chat/users-online/users-online.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    ServerMessagesComponent,
    ChatMessagesComponent,
    UsersOnlineComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    appRouting,
    BrowserAnimationsModule
  ],
  providers: [WebsocketService, MudxmlService, CurrentUserService, EnsureLoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
