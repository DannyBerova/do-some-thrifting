import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class SingleUserResolver implements Resolve<any> {

  constructor(
    private userService: UserService
  )  { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params['id'];
    if (route.url[0].path === 'profile') {
      return this.userService.getSingleUserById(id);
    } else if ((route.url[0].path === 'mine')){
      return this.userService.getSingleUserById(localStorage.getItem('userId'));
    } else {
      return;
    }
  }
}