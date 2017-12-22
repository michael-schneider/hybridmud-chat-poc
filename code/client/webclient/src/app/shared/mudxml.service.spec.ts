import { ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { MudxmlService } from './mudxml.service';
import { MudMessage } from './mud-message';

import { Subscription } from 'rxjs/Subscription';

import { WebsocketService } from './websocket.service';
import { WebsocketMockService } from '../../../testing/websocket-mock.service';

describe('MudxmlService', () => {
  const websocketMockService: WebsocketMockService = new WebsocketMockService();

  beforeEach(() => {

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

  it('should transform the messages from the websocket', inject([MudxmlService], (service: MudxmlService) => {
    const testSubscription = service.getMudxmlObservable().subscribe(
      (mudMessage: MudMessage) => {
        expect(mudMessage.domain).toBe('tag');
        expect(mudMessage.type).toBe('type-attribute');
        expect(mudMessage.message).toBe('<tag type="type-attribute">inner text</tag>');
        testSubscription.unsubscribe();
      },
      () => {
        testSubscription.unsubscribe();
      },
      () => {
        testSubscription.unsubscribe();
      }
    );
    websocketMockService.send('<tag type="type-attribute">inner text</tag>');
  }));

  it('should have information as default type', inject([MudxmlService], (service: MudxmlService) => {
    const testSubscription = service.getMudxmlObservable().subscribe(
      (mudMessage: MudMessage) => {
        expect(mudMessage.domain).toBe('tag');
        expect(mudMessage.type).toBe('information');
        expect(mudMessage.message).toBe('<tag>inner text</tag>');
        testSubscription.unsubscribe();
      },
      () => {
        testSubscription.unsubscribe();
      },
      () => {
        testSubscription.unsubscribe();
      }
    );
    websocketMockService.send('<tag>inner text</tag>');
  }));
});
