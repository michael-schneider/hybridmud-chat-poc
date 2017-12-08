import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

const CHAT_URL = environment.wsUrl;

@Injectable()
export class WebsocketService {
    private readonly subject: Subject<string>;

    public constructor( @Inject(LOCALE_ID) private locale: string) {
        this.subject = new WebSocketSubject(CHAT_URL + '/' + this.locale);
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
