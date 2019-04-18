import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoPageComponent } from './user-info-page/user-info-page.component';
import { UserAllComponent } from './user-all/user-all.component';
import { UserRoutingModule } from './user-routing.module';
import { SingleUserResolver } from 'src/app/core/resolvers/user-details.resolver';
import { CardsFreeModule } from 'angular-bootstrap-md';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { UserDestroyComponent } from './user-destroy/user-destroy.component';

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
