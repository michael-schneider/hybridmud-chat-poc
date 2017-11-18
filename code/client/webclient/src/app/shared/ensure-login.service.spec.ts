import { TestBed, inject } from '@angular/core/testing';

import { EnsureLoginService } from './ensure-login.service';

describe('EnsureLoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnsureLoginService]
    });
  });

  it('should be created', inject([EnsureLoginService], (service: EnsureLoginService) => {
    expect(service).toBeTruthy();
  }));
});
