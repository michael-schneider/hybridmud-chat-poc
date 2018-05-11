import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { MudMessage } from '../src/app/shared/mud-message';

@Injectable()
export class MudxmlMockService {
    private readonly subject: Subject<MudMessage> = new Subject();

    private sentData: string = null;

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

    public getSentData(): string { return this.sentData; }
}
