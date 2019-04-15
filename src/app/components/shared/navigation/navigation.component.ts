import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements DoCheck {

  isLoggedIn: boolean;
  isAdmin: boolean;
  constructor(
    private authService: AuthService,
    private router: Router,
    public toastr: ToastrService
  ) { 
    this.isLoggedIn = this.authService.isAuthenticated();
    this.isAdmin = this.authService.isAdmin();
  }

  ngDoCheck() {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.isAdmin = this.authService.isAdmin();
  }

  logout() {
    this.authService.logout();
    this.toastr.success('Success', 'Logged out!');
    this.router.navigate(['/home']);
  }

  // is() {
  //   console.log(this.authService.isAuthenticated())
  //   return this.authService.isAuthenticated;
  // }

  // get isAdmin() {
  //   return this.authService.isAdmin;
  // }

}
