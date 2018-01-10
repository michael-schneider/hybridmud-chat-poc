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
});
