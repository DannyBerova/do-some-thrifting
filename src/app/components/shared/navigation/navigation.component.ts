import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, DoCheck {

  isLoggedIn: boolean;
  isAdmin: boolean;
  userId: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
    this.initNav()
  }
  
  ngDoCheck() {
    this.initNav()
  }

  initNav() {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.isAdmin = this.authService.isAdmin();
    this.userId = this.authService.getLoggedUserId();
  }

  logout() {
    this.authService.logout();
    this.toastr.success('Success', 'Logged out!');
    this.router.navigate(['/home']);
  }

}
