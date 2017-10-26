import { TestBed, inject } from '@angular/core/testing';

import { MudService } from './mud.service';

describe('MudService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MudService]
    });
  });

  it('should be created', inject([MudService], (service: MudService) => {
    expect(service).toBeTruthy();
  }));
});
