import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { CurrentUserService } from './current-user.service';

@Injectable()
export class EnsureLoginService implements CanActivate {
  constructor(private currentUserService: CurrentUserService, private router: Router) { }

  canActivate(): boolean {
    if (this.currentUserService.isLoggedIn()) {
      return true;
    } else {
      console.log('No Login, redirecting!');
      this.router.navigate(['/']);
      return false;
    }
  }
}
