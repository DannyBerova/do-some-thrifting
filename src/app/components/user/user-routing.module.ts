import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/core/guards/admin.guard';
import { UserAllComponent } from './user-all/user-all.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { SingleUserResolver } from 'src/app/core/resolvers/user-details.resolver';
import { UserInfoPageComponent } from './user-info-page/user-info-page.component';
import { UserAllResolver } from 'src/app/core/resolvers/user-all.resolver';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'all' },
  { path: 'all', component: UserAllComponent, canActivate: [AdminGuard], resolve: { users: UserAllResolver }},
  
  { path: 'profile/:id', component: UserInfoPageComponent, canActivate: [AuthGuard], resolve: { user: SingleUserResolver }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
