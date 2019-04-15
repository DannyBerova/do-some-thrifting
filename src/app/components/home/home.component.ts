import { OnInit, Component, DoCheck } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements DoCheck {
  categories: any;
  username: string;
  isLoggedIn: boolean;
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.username = this.authService.getLoggedUserName();
    this.isLoggedIn = this.authService.isAuthenticated();
  }


  ngDoCheck() {
    this.username = this.authService.getLoggedUserName();
    this.isLoggedIn = this.authService.isAuthenticated();
  }

}
