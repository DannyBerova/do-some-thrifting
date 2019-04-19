import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { IRegisterUser } from '../../shared/models/IRegisterUser';

@Component({
  selector: 'app-user-all',
  templateUrl: './user-all.component.html',
  styleUrls: ['./user-all.component.scss']
})
export class UserAllComponent {

  users: IRegisterUser[];
  headElements: String[] = ['#', 'Username', 'UserID', 'Full Name', 'E-mail', 'Phone Number', 'IsBlocked', 'Profile Link']
  constructor (
    private route: ActivatedRoute,
  ) { 
    this.users = this.route.snapshot.data['users']['users'];
  }
}
