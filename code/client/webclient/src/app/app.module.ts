import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { appRouting } from './app.routing';

import { AppComponent } from './app.component';

import { WebsocketService } from './websocket.service';
import { MudService } from './mud.service';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    appRouting
  ],
  providers: [WebsocketService, MudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
