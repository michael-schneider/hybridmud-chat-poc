import { TestBed, inject } from '@angular/core/testing';

import { DirectMessageUserService } from './direct-message-user.service';

import { User } from '../shared/user';

describe('DirectMessageUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DirectMessageUserService]
    });
  });

  it('should create', inject([DirectMessageUserService], (service: DirectMessageUserService) => {
    expect(service).toBeTruthy();
  }));

  it('should broadcast the current user for direct messages', inject([DirectMessageUserService], (service: DirectMessageUserService) => {
    const testUser: User = {
      userId: 'test-user-id',
      username: 'direct-message-user'
    };

    const testSubscription = service.getDirectMessageUserObservable().subscribe(
      (user: User) => {
        expect(user.userId).toBe('test-user-id');
        expect(user.username).toBe('direct-message-user');
        testSubscription.unsubscribe();
      }
    );
    service.directMessageUser(testUser);
  }));
});
