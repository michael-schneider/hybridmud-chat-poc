import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from '../src/app/shared/user';

@Injectable()
export class CurrentUserMockService {
    private loggedIn = true;

    private currentUser: User = {
        userId: 'test-user-id',
        username: 'testUser'
    };

    constructor() { }

    public isLoggedIn(): boolean {
        return this.loggedIn;
    }

    public getCurrentUser(): User {
        return this.currentUser;
    }

    public setLoggedIn(loggedIn: boolean) {
        this.loggedIn = loggedIn;
    }
}
