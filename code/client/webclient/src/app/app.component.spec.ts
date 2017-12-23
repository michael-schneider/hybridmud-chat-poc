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
  let mudxmlMockService: any;
  let websocketMockService: any;
  let currentUserMockService: any;

  beforeEach(async(() => {
    const mudxmlMockServiceMock: MudxmlMockService = new MudxmlMockService();
    const websocketMockServiceMock: WebsocketMockService = new WebsocketMockService();
    const currentUserMockServiceMock: CurrentUserMockService = new CurrentUserMockService();

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: WebsocketService, useValue: websocketMockServiceMock },
        { provide: MudxmlService, useValue: mudxmlMockServiceMock },
        { provide: CurrentUserService, useValue: currentUserMockServiceMock },
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    mudxmlMockService = fixture.debugElement.injector.get(MudxmlService);
    websocketMockService = fixture.debugElement.injector.get(WebsocketService);
    currentUserMockService = fixture.debugElement.injector.get(CurrentUserService);
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
