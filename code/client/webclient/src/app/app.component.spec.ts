import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { MudxmlService } from './shared/mudxml.service';
import { MudxmlMockService } from '../../testing/mudxml-mock.service';
import { WebsocketService } from './shared/websocket.service';
import { WebsocketMockService } from '../../testing/websocket-mock.service';
import { CurrentUserService } from './shared/current-user.service';
import { CurrentUserMockService } from '../../testing/current-user-mock.service';


describe('AppComponent', () => {
  beforeEach(async(() => {
    const mudxmlMockService: MudxmlMockService = new MudxmlMockService();
    const websocketMockService: WebsocketMockService = new WebsocketMockService();
    const currentUserMockService: CurrentUserMockService = new CurrentUserMockService();

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: WebsocketService, useValue: websocketMockService },
        { provide: MudxmlService, useValue: mudxmlMockService },
        { provide: CurrentUserService, useValue: currentUserMockService },
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
