import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersOnlineComponent } from './users-online.component';
import { MudxmlService } from '../../shared/mudxml.service';
import { MudxmlMockService } from '../../../../testing/mudxml-mock.service';
import { CurrentUserService } from '../../shared/current-user.service';
import { CurrentUserMockService } from '../../../../testing/current-user-mock.service';
import { DirectMessageUserService } from '../direct-message-user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MudMessage } from '../../shared/mud-message';
import { By } from '@angular/platform-browser';

describe('UsersOnlineComponent', () => {
  let component: UsersOnlineComponent;
  let fixture: ComponentFixture<UsersOnlineComponent>;

  let mudxmlMockService: MudxmlMockService;
  let currentUserMockService: CurrentUserMockService;

  beforeEach(async(() => {
    const mudxmlMockServiceInject: MudxmlMockService = new MudxmlMockService();
    const currentUserMockServiceInject: CurrentUserMockService = new CurrentUserMockService();

    TestBed.configureTestingModule({
      declarations: [ UsersOnlineComponent ],
      imports: [BrowserAnimationsModule],
      providers: [
        DirectMessageUserService,
        { provide: MudxmlService, useValue: mudxmlMockServiceInject },
        { provide: CurrentUserService, useValue: currentUserMockServiceInject },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mudxmlMockService = TestBed.get(MudxmlService);
    currentUserMockService = TestBed.get(CurrentUserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login all users after it receives a list of users', () => {
    const message: MudMessage = {
      domain: 'users',
      message: '<users type="list"><user id="uid0">Testuser 0</user><user id="uid1">Testuser 1</user></users>',
      type: 'list'
    };
    mudxmlMockService.next(message);

    fixture.detectChanges();

    const otherUsersShown = fixture.debugElement.queryAll(By.css('.other-user'));
    expect(otherUsersShown.length).toBe(2);
    expect(otherUsersShown[0].nativeElement.textContent).toContain('Testuser 0');
    expect(otherUsersShown[1].nativeElement.textContent).toContain('Testuser 1');
  });

  it('should not login users twice after it receives a list of users', () => {
    const message: MudMessage = {
      domain: 'users',
      message: '<users type="list"><user id="uid0">Testuser 0</user><user id="uid1">Testuser 1</user></users>',
      type: 'list'
    };
    mudxmlMockService.next(message);
    fixture.detectChanges();
    mudxmlMockService.next(message);
    fixture.detectChanges();

    const otherUsersShown = fixture.debugElement.queryAll(By.css('.other-user'));
    expect(otherUsersShown.length).toBe(2);
    expect(otherUsersShown[0].nativeElement.textContent).toContain('Testuser 0');
    expect(otherUsersShown[1].nativeElement.textContent).toContain('Testuser 1');
  });

  it('should remove users that logout', () => {
    const loginMessage: MudMessage = {
      domain: 'users',
      message: '<users type="list"><user id="uid0">Testuser 0</user><user id="uid1">Testuser 1</user></users>',
      type: 'list'
    };
    const logoutMessage: MudMessage = {
      domain: 'users',
      message: '<users type="logout"><user id="uid1">Testuser 1</user></users>',
      type: 'logout'
    };

    mudxmlMockService.next(loginMessage);
    fixture.detectChanges();
    mudxmlMockService.next(logoutMessage);
    fixture.detectChanges();

    const otherUsersShown = fixture.debugElement.queryAll(By.css('.other-user'));
    expect(otherUsersShown.length).toBe(1);
    expect(otherUsersShown[0].nativeElement.textContent).toContain('Testuser 0');
  });

  it('should change the button if there is a user we are messaging to', () => {
    const message: MudMessage = {
      domain: 'users',
      message: '<users type="list"><user id="uid0">Testuser 0</user><user id="uid1">Testuser 1</user></users>',
      type: 'list'
    };

    mudxmlMockService.next(message);
    fixture.detectChanges();

    let directMessageStartButtons = fixture.debugElement.queryAll(By.css('.direct-message-start'));
    expect(directMessageStartButtons.length).toBe(2);

    directMessageStartButtons[0].nativeElement.click();
    fixture.detectChanges();

    directMessageStartButtons = fixture.debugElement.queryAll(By.css('.direct-message-start'));
    expect(directMessageStartButtons.length).toBe(1);

    const directMessageEndButtons = fixture.debugElement.queryAll(By.css('.direct-message-end'));
    expect(directMessageEndButtons.length).toBe(1);
  });

  it('should change the button if there is a user we are no longer messaging to', () => {
    const message: MudMessage = {
      domain: 'users',
      message: '<users type="list"><user id="uid0">Testuser 0</user><user id="uid1">Testuser 1</user></users>',
      type: 'list'
    };

    mudxmlMockService.next(message);
    fixture.detectChanges();

    const messageButtons = fixture.debugElement.queryAll(By.css('.direct-message-start'));

    messageButtons[0].nativeElement.click();
    fixture.detectChanges();

    let directMessageEndButtons = fixture.debugElement.queryAll(By.css('.direct-message-end'));
    expect(directMessageEndButtons.length).toBe(1);

    directMessageEndButtons[0].nativeElement.click();
    fixture.detectChanges();

    directMessageEndButtons = fixture.debugElement.queryAll(By.css('.direct-message-end'));
    expect(directMessageEndButtons.length).toBe(0);
  });

  it('should change the button if there is a user we are direct messaging to is logging out', () => {
    const loginMessage: MudMessage = {
      domain: 'users',
      message: '<users type="list"><user id="uid0">Testuser 0</user><user id="uid1">Testuser 1</user></users>',
      type: 'list'
    };
    const logoutMessage: MudMessage = {
      domain: 'users',
      message: '<users type="logout"><user id="uid0">Testuser 0/user></users>',
      type: 'logout'
    };

    mudxmlMockService.next(loginMessage);
    fixture.detectChanges();

    const messageButtons = fixture.debugElement.queryAll(By.css('.direct-message-start'));

    messageButtons[0].nativeElement.click();
    fixture.detectChanges();

    let directMessageEndButtons = fixture.debugElement.queryAll(By.css('.direct-message-end'));
    expect(directMessageEndButtons.length).toBe(1);

    mudxmlMockService.next(logoutMessage);
    fixture.detectChanges();

    directMessageEndButtons = fixture.debugElement.queryAll(By.css('.direct-message-end'));
    expect(directMessageEndButtons.length).toBe(0);
  });

});
