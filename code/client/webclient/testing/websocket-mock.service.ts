import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WebsocketMockService {
    private readonly subject: Subject<string> = new Subject();

    public constructor() { }

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
