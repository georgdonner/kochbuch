import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ZauberwortService } from '../services/zauberwort.service';

@Injectable()
export class ModifyRecipesGuard implements CanActivate {

constructor(private router: Router, public zauberwort: ZauberwortService) { }

  canActivate() {
    const loggedIn = this.zauberwort.canModify();
    if (loggedIn) {
      return true;
    } else {
      this.router.navigate(['/recipes']);
    }
    return false;
  }

}
