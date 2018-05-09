import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

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

    public sendError(error: Error) {
        this.subject.error(error);
    }
}
