import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChatComponent } from './chat.component';
import { DirectMessageUserService } from './direct-message-user.service';

import { MudxmlService } from '../shared/mudxml.service';
import { MudxmlMockService } from '../../../testing/mudxml-mock.service';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async(() => {
    const mudxmlMockService: MudxmlMockService = new MudxmlMockService();

    TestBed.configureTestingModule({
      declarations: [ChatComponent],
      imports: [FormsModule],
      providers: [
        DirectMessageUserService,
        { provide: MudxmlService, useValue: mudxmlMockService },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
