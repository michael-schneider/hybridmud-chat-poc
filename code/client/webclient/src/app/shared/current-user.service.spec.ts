import { TestBed, inject } from '@angular/core/testing';

import { CurrentUserService } from './current-user.service';

import { MudMessage } from '../shared/mud-message';
import { MudxmlService } from '../shared/mudxml.service';
import { MudxmlMockService } from '../../../testing/mudxml-mock.service';

describe('CurrentUserService', () => {
  const mudxmlMockService: MudxmlMockService = new MudxmlMockService();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentUserService,
        { provide: MudxmlService, useValue: mudxmlMockService },
      ]
    });
  });

  it('should be created', inject([CurrentUserService], (service: CurrentUserService) => {
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
});
