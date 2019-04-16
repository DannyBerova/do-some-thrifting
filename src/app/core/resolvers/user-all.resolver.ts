import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class UserAllResolver implements Resolve<any> {

  constructor(
    private userService: UserService
  )  { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.userService.getAllUsers();
  }
}