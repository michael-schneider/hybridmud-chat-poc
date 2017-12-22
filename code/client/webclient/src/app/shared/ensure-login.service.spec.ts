import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { EnsureLoginService } from './ensure-login.service';

import { CurrentUserService } from '../shared/current-user.service';
import { CurrentUserMockService } from '../../../testing/current-user-mock.service';

describe('EnsureLoginService', () => {
  const currentUserMockService: CurrentUserMockService = new CurrentUserMockService();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        EnsureLoginService,
        { provide: CurrentUserService, useValue: currentUserMockService }
      ]
    });
  });

  it('should be created', inject([EnsureLoginService], (service: EnsureLoginService) => {
    expect(service).toBeTruthy();
  }));

  it('should allow logged in users', inject([EnsureLoginService], (service: EnsureLoginService) => {
    currentUserMockService.setLoggedIn(true);
    expect(service.canActivate()).toBeTruthy();
  }));

  it('should not allow users that are not logged in', inject([EnsureLoginService], (service: EnsureLoginService) => {
    currentUserMockService.setLoggedIn(false);
    expect(service.canActivate()).toBeFalsy();
  }));
});
