import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { MudxmlService } from './shared/mudxml.service';
import { MudxmlMockService } from '../../testing/mudxml-mock.service';
import { MudMessage } from './shared/mud-message';
import { WebsocketService } from './shared/websocket.service';
import { WebsocketMockService } from '../../testing/websocket-mock.service';
import { CurrentUserService } from './shared/current-user.service';
import { CurrentUserMockService } from '../../testing/current-user-mock.service';


describe('AppComponent', () => {
  const mudxmlMockService: MudxmlMockService = new MudxmlMockService();
  const websocketMockService: WebsocketMockService = new WebsocketMockService();
  const currentUserMockService: CurrentUserMockService = new CurrentUserMockService();

  beforeEach(async(() => {

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

  it('should restart if an init-message is received', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    spyOn(app, 'restart');

    const initMessage: MudMessage = {
      domain: 'init',
      type: '',
      message: '<init></init>'
    };

    mudxmlMockService.next(initMessage);
    expect(app.restart).toHaveBeenCalledWith(initMessage);

  }));

});
