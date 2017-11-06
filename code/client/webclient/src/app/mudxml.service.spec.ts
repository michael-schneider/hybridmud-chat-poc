import { TestBed, inject } from '@angular/core/testing';

import { MudxmlService } from './mudxml.service';

describe('MudxmlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MudxmlService]
    });
  });

  it('should be created', inject([MudxmlService], (service: MudxmlService) => {
    expect(service).toBeTruthy();
  }));
});
