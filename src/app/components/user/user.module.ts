import { NgModule } from '@angular/core';
import { CardsFreeModule } from 'angular-bootstrap-md';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserInfoPageComponent } from './user-info-page/user-info-page.component';
import { UserAllComponent } from './user-all/user-all.component';
import { UserDestroyComponent } from './user-destroy/user-destroy.component';
import { SingleUserResolver } from 'src/app/core/resolvers/user-details.resolver';

@NgModule({
  declarations: [
    UserInfoPageComponent, 
    UserAllComponent, 
    UserDestroyComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CardsFreeModule,
    UserRoutingModule
  ],
  providers: [
    SingleUserResolver
  ]
})
export class UserModule { }
