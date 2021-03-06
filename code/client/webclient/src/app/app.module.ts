import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { WebsocketService } from './shared/websocket.service';
import { MudxmlService } from './shared/mudxml.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { ServerMessagesComponent } from './shared/server-messages/server-messages.component';
import { CurrentUserService } from './shared/current-user.service';
import { ChatMessagesComponent } from './chat/chat-messages/chat-messages.component';
import { UsersOnlineComponent } from './chat/users-online/users-online.component';
import { EnsureLoginService } from './shared/ensure-login.service';
import { DirectMessageUserService } from './chat/direct-message-user.service';

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
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [WebsocketService, MudxmlService, CurrentUserService, DirectMessageUserService, EnsureLoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
