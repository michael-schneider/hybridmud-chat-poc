import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { WebsocketService } from './websocket.service';
import { MudService } from './mud.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [WebsocketService, MudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
