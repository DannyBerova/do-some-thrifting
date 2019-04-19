import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from 'src/app/core/guards/admin.guard';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { SingleUserResolver } from 'src/app/core/resolvers/user-details.resolver';
import { UserAllResolver } from 'src/app/core/resolvers/user-all.resolver';
import { UserAllComponent } from './user-all/user-all.component';
import { UserInfoPageComponent } from './user-info-page/user-info-page.component';
import { UserDestroyComponent } from './user-destroy/user-destroy.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'all' },
  { path: 'all', component: UserAllComponent, canActivate: [AdminGuard], resolve: { users: UserAllResolver }},
  { path: 'profile/:id', component: UserInfoPageComponent, canActivate: [AuthGuard], resolve: { user: SingleUserResolver }},
  { path: 'destroy/:id', component: UserDestroyComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
