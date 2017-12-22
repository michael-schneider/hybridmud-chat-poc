import { TestBed, inject } from '@angular/core/testing';

import { MudxmlService } from './mudxml.service';

import { WebsocketService } from './websocket.service';
import { WebsocketMockService } from '../../../testing/websocket-mock.service';

describe('MudxmlService', () => {
  beforeEach(() => {
    const websocketMockService: WebsocketMockService = new WebsocketMockService();

    TestBed.configureTestingModule({
      providers: [
        MudxmlService,
        { provide: WebsocketService, useValue: websocketMockService },
      ]
    });
  });

  it('should be created', inject([MudxmlService], (service: MudxmlService) => {
    expect(service).toBeTruthy();
  }));
});
