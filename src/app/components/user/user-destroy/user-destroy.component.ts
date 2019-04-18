import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user-destroy',
  templateUrl: './user-destroy.component.html',
  styleUrls: ['./user-destroy.component.scss']
})
export class UserDestroyComponent implements OnInit {
  @Input() id: string;
  name: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,

  ) { 
    this.route.paramMap.subscribe( params => {
      this.id = params.get('id');
      this.name = this.authService.getLoggedUserName();
    })
  }

  ngOnInit() {
  }

  destroy() {
    const creator = localStorage.getItem('userId');
    this.userService.destroyUser(this.id).subscribe(data => {
      this.authService.logout();
      this.router.navigate(['/home']);
    })
    console.log("delete")
  }
}
