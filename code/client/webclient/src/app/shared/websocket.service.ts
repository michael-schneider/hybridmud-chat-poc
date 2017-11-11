import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import { environment } from '../../environments/environment';

const CHAT_URL = environment.wsUrl;

@Injectable()
export class WebsocketService {
    private readonly subject: Subject<any>;

    public constructor() {
        this.subject = new WebSocketSubject(CHAT_URL);
    }

    public send(data: string) {
        this.subject.next(data);
    }

    public close() {
        this.subject.complete();
    }

    public getWebsocketObservable() {
        return this.subject.asObservable();
    }
}
