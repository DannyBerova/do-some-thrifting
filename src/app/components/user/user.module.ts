import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserInfoPageComponent } from './user-info-page/user-info-page.component';
import { UserAllComponent } from './user-all/user-all.component';
import { UserRoutingModule } from './user-routing.module';
import { SingleUserResolver } from 'src/app/core/resolvers/user-details.resolver';

@NgModule({
  declarations: [
    UserProfileComponent, 
    UserInfoPageComponent, 
    UserAllComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  providers: [
    SingleUserResolver
  ]
})
export class UserModule { }
