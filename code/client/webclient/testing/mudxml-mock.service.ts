import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { MudMessage } from '../src/app/shared/mud-message';

@Injectable()
export class MudxmlMockService {
    private readonly subject: Subject<MudMessage> = new Subject();

    private sentData: string;

    constructor() { }

    public send(data: string) {
        this.sentData = data;
    }

    public getMudxmlObservable(): Observable<MudMessage> {
        return this.subject.asObservable();
    }

    public next(mudMessage: MudMessage) {
        this.subject.next(mudMessage);
    }
}
