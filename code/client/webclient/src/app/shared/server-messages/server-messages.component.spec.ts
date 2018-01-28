import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerMessagesComponent } from './server-messages.component';

import { MudxmlService } from '../../shared/mudxml.service';
import { MudxmlMockService } from '../../../../testing/mudxml-mock.service';
import { MudMessage } from '../mud-message';
import { By } from '@angular/platform-browser';

describe('ServerMessagesComponent', () => {
  let component: ServerMessagesComponent;
  let fixture: ComponentFixture<ServerMessagesComponent>;
  let mudxmlMockService: MudxmlMockService;

  beforeEach(async(() => {
    const mudxmlMockServiceInject: MudxmlMockService = new MudxmlMockService();

    TestBed.configureTestingModule({
      providers: [
        { provide: MudxmlService, useValue: mudxmlMockServiceInject },
      ],
      declarations: [ServerMessagesComponent]
    })
      .compileComponents();
    mudxmlMockService = TestBed.get(MudxmlService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show messages from server', () => {
    const message: MudMessage = {
      domain: 'tdomain',
      message: '<tdomain type="test">Heyho lets <em>go</em>!</tdomain>',
      type: 'test'
    };
    mudxmlMockService.next(message);

    fixture.detectChanges();

    const serverMessageShown = fixture.debugElement.query(By.css('.message-list'));
    expect(serverMessageShown).toBeTruthy();
    expect(serverMessageShown.nativeElement.textContent).toContain('<tdomain type="test">Heyho lets <em>go</em>!</tdomain>');
  });
});
