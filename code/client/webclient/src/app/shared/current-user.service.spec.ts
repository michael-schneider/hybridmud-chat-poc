import { TestBed, inject } from '@angular/core/testing';

import { CurrentUserService } from './current-user.service';

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
});
