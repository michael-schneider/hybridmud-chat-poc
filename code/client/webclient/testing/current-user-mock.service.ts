import { Injectable } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';


import { User } from '../src/app/shared/user';

@Injectable()
export class CurrentUserMockService {
    private currentUser: User;

    constructor() { }

    public isLoggedIn(): boolean {
        return true;
    }

    public getCurrentUser(): User {
        return this.currentUser;
    }
}
