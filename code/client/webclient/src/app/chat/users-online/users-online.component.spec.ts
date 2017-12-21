import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersOnlineComponent } from './users-online.component';
import { MudxmlService } from '../../shared/mudxml.service';
import { MudxmlMockService } from '../../../../testing/mudxml-mock.service';
import { CurrentUserService } from '../../shared/current-user.service';
import { CurrentUserMockService } from '../../../../testing/current-user-mock.service';
import { DirectMessageUserService } from '../direct-message-user.service';

describe('UsersOnlineComponent', () => {
  let component: UsersOnlineComponent;
  let fixture: ComponentFixture<UsersOnlineComponent>;

  beforeEach(async(() => {
    const mudxmlMockService: MudxmlMockService = new MudxmlMockService();
    const currentUserMockService: CurrentUserMockService = new CurrentUserMockService();

    TestBed.configureTestingModule({
      declarations: [ UsersOnlineComponent ],
      providers: [
        DirectMessageUserService,
        { provide: MudxmlService, useValue: mudxmlMockService },
        { provide: CurrentUserService, useValue: currentUserMockService },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
