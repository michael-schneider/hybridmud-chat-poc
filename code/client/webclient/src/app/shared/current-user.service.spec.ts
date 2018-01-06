import { TestBed, inject } from '@angular/core/testing';

import { CurrentUserService } from './current-user.service';

import { MudMessage } from '../shared/mud-message';
import { MudxmlService } from '../shared/mudxml.service';
import { MudxmlMockService } from '../../../testing/mudxml-mock.service';

describe('CurrentUserService', () => {
  let mudxmlMockService: MudxmlMockService;

  beforeEach(() => {
    const mudxmlMockServiceMock: MudxmlMockService = new MudxmlMockService();

    TestBed.configureTestingModule({
      providers: [CurrentUserService,
        { provide: MudxmlService, useValue: mudxmlMockServiceMock },
      ]
    });

    mudxmlMockService = TestBed.get(MudxmlService);
  });

  it('should create', inject([CurrentUserService], (service: CurrentUserService) => {
    expect(service).toBeTruthy();
  }));

  it('should extract the current user from a successful login message', inject([CurrentUserService], (service: CurrentUserService) => {
    const loginMessage: MudMessage = {
      domain: 'login',
      type: 'success',
      message: '<login type="success"><user id="test-user-id">TestUser</user></login>'
    };

    mudxmlMockService.next(loginMessage);
    const user = service.getCurrentUser();
    expect(user.userId).toBe('test-user-id');
    expect(user.username).toBe('TestUser');
  }));

  it('should acceptr a current user as logged in', inject([CurrentUserService], (service: CurrentUserService) => {
    const loginMessage: MudMessage = {
      domain: 'login',
      type: 'success',
      message: '<login type="success"><user id="test-user-id">TestUser</user></login>'
    };

    mudxmlMockService.next(loginMessage);
    expect(service.isLoggedIn()).toBeTruthy();
  }));

  it('should not extract the current user from a login failure message', inject([CurrentUserService], (service: CurrentUserService) => {
    const loginMessage: MudMessage = {
      domain: 'login',
      type: 'failure',
      message: '<login type="failure"><user id="test-user-id">TestUser</user></login>'
    };

    mudxmlMockService.next(loginMessage);
    const user = service.getCurrentUser();

    expect(user).toBeUndefined();
  }));

  it('should interpret no current user as no logged in user', inject([CurrentUserService], (service: CurrentUserService) => {
    expect(service.isLoggedIn()).toBeFalsy();
  }));

});
