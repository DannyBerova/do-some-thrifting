import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IPost } from '../../shared/models/IPost';
import { IRegisterUser } from '../../shared/models/IRegisterUser';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { messages } from '../../../core/consts'


const IS_BLOCKED = 'Blocked';
const IS_ACTIVE = 'Active';
const BLOCK = 'Block';
const UNBLOCK = 'Unblock';
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
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.user = this.route.snapshot.data['user']['user'];
    window.location.hash = 'top';
    this.posts = this.user['posts'].sort((a,b) => {
      a = new Date(a.createdOn);
      b = new Date(b.createdOn); //move to resolver
      return a>b ? -1 : a<b ? 1 : 0; 
    });

    this.ifNotPosts = this.user['posts'].length === 0;
    this.setStatusButton();

    this.isAdmin = this.authService.isAdmin();
    this.isAdminProfile = this.isAdmin
      && (this.authService.getLoggedUserId() === this.user._id);
    this.isAuthAndOwner = !this.isAdmin
      && (this.authService.getLoggedUserId() === this.user._id);
  }

  blockUnblockUser() {
    this.userservice.blockUnblockUser(this.user._id).subscribe( res => {
      this.setStatusButton();
      this.toastr.success(messages.success, res['message'])
    })
  }

  setStatusButton() {
    this.activeStatus = this.user['isBlocked'] ? IS_BLOCKED : IS_ACTIVE;
    this.blockUnblock = this.user['isBlocked'] ? UNBLOCK : BLOCK;
  }
}
