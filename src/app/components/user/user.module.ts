import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserInfoPageComponent } from './user-info-page/user-info-page.component';
import { UserAllComponent } from './user-all/user-all.component';
import { UserRoutingModule } from './user-routing.module';
import { SingleUserResolver } from 'src/app/core/resolvers/user-details.resolver';
// import { PostCardInfoComponent } from '../shared/post-card-info/post-card-info.component';
import { CardsFreeModule } from 'angular-bootstrap-md';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    UserProfileComponent, 
    UserInfoPageComponent, 
    UserAllComponent,
    // PostCardInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CardsFreeModule,
    UserRoutingModule
  ],
  providers: [
    SingleUserResolver
  ]
})
export class UserModule { }
