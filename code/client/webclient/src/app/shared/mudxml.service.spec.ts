import { ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { MudxmlService } from './mudxml.service';
import { MudMessage } from './mud-message';

import { Subscription } from 'rxjs/Subscription';

import { WebsocketService } from './websocket.service';
import { WebsocketMockService } from '../../../testing/websocket-mock.service';

describe('MudxmlService', () => {
  let websocketMockService: WebsocketMockService;

  beforeEach(() => {
    const websocketMockServiceMock: WebsocketMockService = new WebsocketMockService();
    TestBed.configureTestingModule({
      providers: [
        MudxmlService,
        { provide: WebsocketService, useValue: websocketMockServiceMock },
      ]
    });

    websocketMockService = TestBed.get(WebsocketService);
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
      }
    );
    websocketMockService.send('<tag>inner text</tag>');
  }));

  it('should send to the websocket', inject([MudxmlService], (service: MudxmlService) => {
    const testSubscription = websocketMockService.getWebsocketObservable().subscribe(
      (message: string) => {
        expect(message).toBe('<test>success!</test>');
        testSubscription.unsubscribe();
      }
    );
    service.send('<test>success!</test>');
  }));

  it('should transfer an error into a message', inject([MudxmlService], (service: MudxmlService) => {
    const testSubscription = service.getMudxmlObservable().subscribe(
      (mudMessage: MudMessage) => {
        expect(mudMessage.domain).toBe('server');
        expect(mudMessage.type).toBe('error');
        expect(mudMessage.message)
          .toBe('<server type="error">Problem with websocket connection ws://localhost:19100.</server>');
        testSubscription.unsubscribe();
      }
    );
    const error: Error = {
      message: 'Test Error',
      name: 'Named Error'
    };
    websocketMockService.sendError(error);
  }));
});
