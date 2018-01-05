import { NO_ERRORS_SCHEMA, } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ChatComponent } from './chat.component';
import { DirectMessageUserService } from './direct-message-user.service';

import { MudxmlService } from '../shared/mudxml.service';
import { MudxmlMockService } from '../../../testing/mudxml-mock.service';
import { MudMessage } from '../shared/mud-message';
import { User } from '../shared/user';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  let mudxmlService: MudxmlService;
  let directMessageUserService: DirectMessageUserService;

  beforeEach(async(() => {
    const mudxmlMockService: MudxmlMockService = new MudxmlMockService();

    TestBed.configureTestingModule({
      declarations: [ChatComponent],
      imports: [FormsModule, BrowserAnimationsModule],
      providers: [
        DirectMessageUserService,
        { provide: MudxmlService, useValue: mudxmlMockService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mudxmlService = TestBed.get(MudxmlService);
    directMessageUserService = TestBed.get(DirectMessageUserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send messages', async(() => {
    spyOn(mudxmlService, 'send');
    const chatInput: HTMLInputElement = fixture.debugElement.query(By.css('#messageInput')).nativeElement;
    const chatButton: HTMLElement = fixture.debugElement.query(By.css('#chatButton')).nativeElement;
    const message = 'I Want to chat!';

    chatInput.value = message;
    chatInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.message).toBe(message);
    chatButton.click();
    expect(mudxmlService.send).toHaveBeenCalled();
    expect(mudxmlService.send).toHaveBeenCalledWith(message);
  }));

  it('should escape messages that start with a slash', async(() => {
    spyOn(mudxmlService, 'send');
    const chatInput: HTMLInputElement = fixture.debugElement.query(By.css('#messageInput')).nativeElement;
    const chatButton: HTMLElement = fixture.debugElement.query(By.css('#chatButton')).nativeElement;
    const message = '/I Want to chat!';

    chatInput.value = message;
    chatInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.message).toBe(message);
    chatButton.click();
    expect(mudxmlService.send).toHaveBeenCalled();
    expect(mudxmlService.send).toHaveBeenCalledWith('\\' + message);
  }));

  it('should assign a direct user', () => {
    const user: User = {
      userId: 'testuser-123',
      username: 'TesterMaster'
    };
    directMessageUserService.directMessageUser(user);
    expect(component.directMessageRecipient).toBe(user);
  });

  it('should use tell if there is a direct user', async(() => {
    spyOn(mudxmlService, 'send');
    const user: User = {
      userId: 'testuser-123',
      username: 'TesterMaster'
    };
    directMessageUserService.directMessageUser(user);

    const chatInput: HTMLInputElement = fixture.debugElement.query(By.css('#messageInput')).nativeElement;
    const chatButton: HTMLElement = fixture.debugElement.query(By.css('#chatButton')).nativeElement;
    const message = 'I Want to tell!';

    chatInput.value = message;
    chatInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.message).toBe(message);
    chatButton.click();
    expect(mudxmlService.send).toHaveBeenCalled();
    expect(mudxmlService.send).toHaveBeenCalledWith('/tell ' + user.username + ' ' + message);
  }));

  it('should call logout() if button is pressed', async(() => {
    spyOn(component, 'logout');
    const logoutButton: HTMLElement = fixture.debugElement.query(By.css('#logoutButton')).nativeElement;
    const message = '/I Want to chat!';

    logoutButton.click();
    expect(component.logout).toHaveBeenCalled();
  }));

  it('should not show a direct message label if there is no user to message to', async(() => {
    const directMessageLabel = fixture.debugElement.query(By.css('#directMessageLabel'));
    expect(directMessageLabel).toBeFalsy();
  }));

  it('should show a direct message label if there is a user to message to', async(() => {
    const user: User = {
      userId: 'testuser-123',
      username: 'TesterMaster'
    };
    directMessageUserService.directMessageUser(user);
    fixture.detectChanges();
    const directMessageLabel = fixture.debugElement.query(By.css('#directMessageLabel'));

    expect(directMessageLabel).toBeTruthy();
  }));
});
