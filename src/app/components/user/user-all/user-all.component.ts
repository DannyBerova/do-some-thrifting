import { Component, OnInit } from '@angular/core';
import { IRegisterUser } from '../../shared/models/IRegisterUser';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-all',
  templateUrl: './user-all.component.html',
  styleUrls: ['./user-all.component.scss']
})
export class UserAllComponent implements OnInit {

  users: IRegisterUser[];
  headElements: String[] = ['#', 'Username', 'UserID', 'Full Name', 'E-mail', 'Phone Number', 'IsBlocked', 'Profile Link']
  constructor (
  private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) { 
    this.users = this.route.snapshot.data['users']['users'];
  }

  ngOnInit() {
  }

}
