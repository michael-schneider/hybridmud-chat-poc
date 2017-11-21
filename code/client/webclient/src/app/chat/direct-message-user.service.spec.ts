import { TestBed, inject } from '@angular/core/testing';

import { DirectMessageUserService } from './direct-message-user.service';

describe('DirectMessageUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DirectMessageUserService]
    });
  });

  it('should be created', inject([DirectMessageUserService], (service: DirectMessageUserService) => {
    expect(service).toBeTruthy();
  }));
});
