import { Component, OnInit } from '@angular/core';
import { IRegisterUser } from '../../shared/models/IRegisterUser';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.scss']
})
export class UserInfoPageComponent implements OnInit {

  user: IRegisterUser;
  ifNotPosts: boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) { 
    this.user = this.route.snapshot.data['user']['user'];
    this.ifNotPosts = this.user['posts'].length === 0;
  }

  ngOnInit() {
  }

}
