import { TestBed, inject } from '@angular/core/testing';

import { WebsocketService } from './websocket.service';

describe('WebsocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebsocketService]
    });
  });

  it('should create', inject([WebsocketService], (service: WebsocketService) => {
    expect(service).toBeTruthy();
  }));
});
