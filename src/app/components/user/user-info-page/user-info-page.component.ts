import { Component, OnInit } from '@angular/core';
import { IRegisterUser } from '../../shared/models/IRegisterUser';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { IPost } from '../../shared/models/IPost';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.scss']
})
export class UserInfoPageComponent implements OnInit {

  user: IRegisterUser;
  posts: IPost[];
  ifNotPosts: boolean;
  isAdmin: boolean;
  isAuthAndOwner: boolean;
  isAdminProfile: boolean;
  blockUnblock: string;
  activeStatus: string;
  constructor(
    private authService: AuthService,
    private userservice: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) { 
    this.user = this.route.snapshot.data['user']['user'];
    this.posts = this.user['posts'].sort((a,b) => {
      a = new Date(a.createdOn);
      b = new Date(b.createdOn);
      return a>b ? -1 : a<b ? 1 : 0;
    });
    this.ifNotPosts = this.user['posts'].length === 0;
    this.blockUnblock = this.user['isBlocked'] ? 'Unblock' : 'Block';
    this.activeStatus = this.user['isBlocked'] ? 'Blocked' : 'Active';
    this.isAdmin = this.authService.isAdmin();

    this.isAdminProfile = this.isAdmin
      && (this.authService.getLoggedUserId() === this.user._id);
      this.isAuthAndOwner = !this.isAdmin
      && (this.authService.getLoggedUserId() === this.user._id);
  }

  ngOnInit() {
  }

  blockUnblockUser() {
    this.userservice.blockUnblockUser(this.user._id).subscribe( res => {
      this.activeStatus = res['user']['isBlocked'] ? 'Blocked' : 'Active';
      this.blockUnblock = res['user']['isBlocked'] ? 'Unblock' : 'Block';
      this.toastr.success('Success', res['message'])
    })
    console.log(this.user._id)

  }

}
