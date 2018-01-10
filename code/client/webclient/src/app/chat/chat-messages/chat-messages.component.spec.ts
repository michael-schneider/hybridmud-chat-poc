import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessagesComponent } from './chat-messages.component';

import { MudxmlService } from '../../shared/mudxml.service';
import { MudxmlMockService } from '../../../../testing/mudxml-mock.service';
import { MudMessage } from '../../shared/mud-message';
import { ChatMessage, ChatMessageType } from './chat-message';
import { By } from '@angular/platform-browser';

describe('ChatMessagesComponent', () => {
  let component: ChatMessagesComponent;
  let fixture: ComponentFixture<ChatMessagesComponent>;

  let mudxmlMockService: MudxmlMockService;

  beforeEach(async(() => {
    const mudxmlMockServiceInject: MudxmlMockService = new MudxmlMockService();

    TestBed.configureTestingModule({
      declarations: [ChatMessagesComponent],
      providers: [
        { provide: MudxmlService, useValue: mudxmlMockServiceInject },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mudxmlMockService = TestBed.get(MudxmlService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a message with type error to the chat-messages as error', () => {
    const message: MudMessage = {
      domain: 'domain',
      message: 'Test Error Message',
      type: 'error'
    };
    mudxmlMockService.next(message);
    const lastChatMessage = getLastEntryFrom(component.chatMessages);
    expect(lastChatMessage.type).toBe(ChatMessageType.ERROR);
    expect(lastChatMessage.message).toBe('Test Error Message');
  });

  it('should show a message with type error to the chat-messages as error', () => {
    const message: MudMessage = {
      domain: 'domain',
      message: 'Test Error Message',
      type: 'error'
    };
    mudxmlMockService.next(message);

    fixture.detectChanges();

    const errorMessageShown = fixture.debugElement.query(By.css('.errorMessage'));
    expect(errorMessageShown).toBeTruthy();
    expect(errorMessageShown.nativeElement.textContent).toBe('Test Error Message');
  });

  it('should remove XML from error messages', () => {
    const message: MudMessage = {
      domain: 'domain',
      message: '<test>Test </test>Error Message<xml>',
      type: 'error'
    };
    mudxmlMockService.next(message);
    const lastChatMessage = getLastEntryFrom(component.chatMessages);
    expect(lastChatMessage.type).toBe(ChatMessageType.ERROR);
    expect(lastChatMessage.message).toBe('Test Error Message');
  });

  it('should add a message with a login to the chat-messages as login-message', () => {
    const message: MudMessage = {
      domain: 'users',
      message: '<users type="login"><user id="uid0">testuser</user></users>',
      type: 'login'
    };
    mudxmlMockService.next(message);
    const lastChatMessage = getLastEntryFrom(component.chatMessages);
    expect(lastChatMessage.type).toBe(ChatMessageType.LOGIN);
    expect(lastChatMessage.message).toBe('');
    expect(lastChatMessage.userId).toBe('uid0');
    expect(lastChatMessage.username).toBe('testuser');
  });

  it('should show a message with a login to the chat-messages as login-message', () => {
    const message: MudMessage = {
      domain: 'users',
      message: '<users type="login"><user id="uid0">testuser</user></users>',
      type: 'login'
    };
    mudxmlMockService.next(message);

    fixture.detectChanges();

    const loginMessageShown = fixture.debugElement.query(By.css('.message-list b'));
    expect(loginMessageShown).toBeTruthy();
    expect(loginMessageShown.nativeElement.textContent).toBe('testuser has logged in.');
  });

  it('should add a message with a logout to the chat-messages as logout-message', () => {
    const message: MudMessage = {
      domain: 'users',
      message: '<users type="login"><user id="uid0">testuser</user></users>',
      type: 'logout'
    };
    mudxmlMockService.next(message);
    const lastChatMessage = getLastEntryFrom(component.chatMessages);
    expect(lastChatMessage.type).toBe(ChatMessageType.LOGOUT);
    expect(lastChatMessage.message).toBe('');
    expect(lastChatMessage.userId).toBe('uid0');
    expect(lastChatMessage.username).toBe('testuser');
  });

  it('should show a message with a logout to the chat-messages as logout-message', () => {
    const message: MudMessage = {
      domain: 'users',
      message: '<users type="login"><user id="uid0">testuser</user></users>',
      type: 'logout'
    };
    mudxmlMockService.next(message);

    fixture.detectChanges();

    const loginMessageShown = fixture.debugElement.query(By.css('.message-list b'));
    expect(loginMessageShown).toBeTruthy();
    expect(loginMessageShown.nativeElement.textContent).toBe('testuser has logged out.');
  });

  it('should inore users messages that are neither login nor logout', () => {
    const message: MudMessage = {
      domain: 'users',
      message: '<users type="dance"><user id="uid0">testuser</user></users>',
      type: 'dance'
    };
    mudxmlMockService.next(message);
    expect(component.chatMessages.length).toBe(0);
  });

  it('should add a message with a chat to the chat-messages as chat-message', () => {
    const message: MudMessage = {
      domain: 'chat',
      message: '<chat><user id="uid0">testuser</user><message>Test Message</message></chat>',
      type: ''
    };
    mudxmlMockService.next(message);
    const lastChatMessage = getLastEntryFrom(component.chatMessages);
    expect(lastChatMessage.type).toBe(ChatMessageType.CHAT);
    expect(lastChatMessage.message).toBe('Test Message');
    expect(lastChatMessage.userId).toBe('uid0');
    expect(lastChatMessage.username).toBe('testuser');
  });

  it('should show a message with a chat to the chat-messages as chat-message', () => {
    const message: MudMessage = {
      domain: 'chat',
      message: '<chat><user id="uid0">testuser</user><message>Test Message</message></chat>',
      type: ''
    };
    mudxmlMockService.next(message);

    fixture.detectChanges();

    const userShown = fixture.debugElement.query(By.css('.message-list b'));
    expect(userShown).toBeTruthy();
    expect(userShown.nativeElement.textContent).toBe('testuser:');

    const messageShown = fixture.debugElement.query(By.css('.message-list div'));
    expect(messageShown).toBeTruthy();
    expect(messageShown.nativeElement.textContent).toContain('testuser: Test Message');
  });

  it('should not show a message if the message is empty', () => {
    const message: MudMessage = {
      domain: 'chat',
      message: '<chat><user id="uid0">testuser</user><message></message></chat>',
      type: ''
    };
    mudxmlMockService.next(message);

    fixture.detectChanges();

    const messageShown = fixture.debugElement.query(By.css('.message-list div'));
    expect(messageShown).toBeFalsy();
  });

  it('should show a message with a tell to another user to the chat-messages as tell to', () => {
    const message: MudMessage = {
      domain: 'chat',
      message: '<chat type="tell" direction="to"><user id="uid0">testuser</user><message>Hello Test!</message></chat>',
      type: 'tell'
    };
    mudxmlMockService.next(message);

    fixture.detectChanges();

    const userShown = fixture.debugElement.query(By.css('.message-list b'));
    expect(userShown).toBeTruthy();
    expect(userShown.nativeElement.textContent).toBe('You tell testuser:');

    const messageShown = fixture.debugElement.query(By.css('.message-list div'));
    expect(messageShown).toBeTruthy();
    expect(messageShown.nativeElement.textContent).toContain('Hello Test!');
  });

  it('should show a message with a tell from another user to the chat-messages as tell from', () => {
    const message: MudMessage = {
      domain: 'chat',
      message: '<chat type="tell" direction="from"><user id="uid0">testuser</user><message>Hello Test!</message></chat>',
      type: 'tell'
    };
    mudxmlMockService.next(message);

    fixture.detectChanges();

    const userShown = fixture.debugElement.query(By.css('.message-list b'));
    expect(userShown).toBeTruthy();
    expect(userShown.nativeElement.textContent).toBe('testuser tells you:');

    const messageShown = fixture.debugElement.query(By.css('.message-list div'));
    expect(messageShown).toBeTruthy();
    expect(messageShown.nativeElement.textContent).toContain('Hello Test!');
  });

  it('should ignore tell messages with wrong direction', () => {
    const message: MudMessage = {
      domain: 'chat',
      message: '<chat type="tell" direction="around"><user id="uid0">testuser</user><message>Hello Test!</message></chat>',
      type: 'tell'
    };
    mudxmlMockService.next(message);

    expect(component.chatMessages.length).toBe(0);
  });


  function getLastEntryFrom(chatMessagesArray: ChatMessage[]): ChatMessage {
    return chatMessagesArray[chatMessagesArray.length - 1];
  }
});
