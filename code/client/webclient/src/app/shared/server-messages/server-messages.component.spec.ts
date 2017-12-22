import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerMessagesComponent } from './server-messages.component';

import { MudxmlService } from '../../shared/mudxml.service';
import { MudxmlMockService } from '../../../../testing/mudxml-mock.service';

describe('ServerMessagesComponent', () => {
  let component: ServerMessagesComponent;
  let fixture: ComponentFixture<ServerMessagesComponent>;

  beforeEach(async(() => {
    const mudxmlMockService: MudxmlMockService = new MudxmlMockService();

    TestBed.configureTestingModule({
      providers: [
        { provide: MudxmlService, useValue: mudxmlMockService },
      ],
      declarations: [ServerMessagesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
