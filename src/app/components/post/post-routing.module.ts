import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostAllComponent } from './post-all/post-all.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { PostDeleteComponent } from './post-delete/post-delete.component';
import { SinglePostResolver } from 'src/app/core/resolvers/post-details.resolver';
import { BlockedGuard } from 'src/app/core/guards/blocked.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'all' },
  { path: 'all', component: PostAllComponent, canActivate: [AuthGuard] },
  { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard, BlockedGuard] },
  { path: 'edit/:id', component: PostEditComponent, canActivate: [AuthGuard] },
  { path: 'delete/:id/:name', component: PostDeleteComponent, canActivate: [AuthGuard] },
  { path: 'details/:id', component: PostDetailsComponent, canActivate: [AuthGuard, BlockedGuard],  resolve: { post: SinglePostResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
