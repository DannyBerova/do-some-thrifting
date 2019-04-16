import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class UserAllResolver implements Resolve<any> {

  constructor(
    private userService: UserService
  )  { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const id = route.params['id'];
    // console.log(id);
    // if (route.url[0].path === 'all') {
      return this.userService.getAllUsers();
    // } else {
    //   return this.userService.getSingleUserById(localStorage.getItem('userId'));
    // }
  }
}