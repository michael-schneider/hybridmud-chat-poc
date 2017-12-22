import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { EnsureLoginService } from './ensure-login.service';

import { CurrentUserService } from '../shared/current-user.service';
import { CurrentUserMockService } from '../../../testing/current-user-mock.service';

describe('EnsureLoginService', () => {
  beforeEach(() => {
    const currentUserMockService: CurrentUserMockService = new CurrentUserMockService();

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
});
