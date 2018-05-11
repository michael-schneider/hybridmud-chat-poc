import { Injectable } from '@angular/core';
import { Subject ,  Observable } from 'rxjs';
import { User } from '../shared/user';

@Injectable()
export class DirectMessageUserService {

  private subject = new Subject<User>();

  public directMessageUser(user: User) {
    this.subject.next(user);
  }

  public getDirectMessageUserObservable(): Observable<User> {
    return this.subject.asObservable();
  }

}
