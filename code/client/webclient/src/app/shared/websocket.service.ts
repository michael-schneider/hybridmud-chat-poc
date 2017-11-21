import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

const CHAT_URL = environment.wsUrl;

@Injectable()
export class WebsocketService {
    private readonly subject: Subject<string>;

    public constructor() {
        this.subject = new WebSocketSubject(CHAT_URL);
    }

    public send(data: string) {
        this.subject.next(data);
    }

    public close() {
        this.subject.complete();
    }

    public getWebsocketObservable(): Observable<string> {
        return this.subject.asObservable();
    }
}
