import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessagesComponent } from './chat-messages.component';

import { MudxmlService } from '../../shared/mudxml.service';
import { MudxmlMockService } from '../../../../testing/mudxml-mock.service';

describe('ChatMessagesComponent', () => {
  let component: ChatMessagesComponent;
  let fixture: ComponentFixture<ChatMessagesComponent>;

  beforeEach(async(() => {
    const mudxmlMockService: MudxmlMockService = new MudxmlMockService();

    TestBed.configureTestingModule({
      declarations: [ChatMessagesComponent],
      providers: [
        { provide: MudxmlService, useValue: mudxmlMockService },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
