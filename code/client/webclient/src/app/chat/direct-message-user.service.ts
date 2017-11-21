import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { User } from '../shared/user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DirectMessageUserService {

  private subject = new Subject<User>();

  directMessageUser(user: User) {
    this.subject.next(user);
  }

  getDirectMessageUserObservable(): Observable<User> {
    return this.subject.asObservable();
  }

}
