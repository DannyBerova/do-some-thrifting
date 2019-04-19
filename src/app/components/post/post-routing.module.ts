import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostAllComponent } from './post-all/post-all.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostDeleteComponent } from './post-delete/post-delete.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { BlockedGuard } from 'src/app/core/guards/blocked.guard';
import { SinglePostResolver } from 'src/app/core/resolvers/post-details.resolver';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'all' },
  { path: 'all', component: PostAllComponent },
  { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard, BlockedGuard] },
  { path: 'edit/:id', component: PostEditComponent, canActivate: [AuthGuard] },
  { path: 'delete/:id/:name', component: PostDeleteComponent, canActivate: [AuthGuard] },
  { path: 'details/:id', component: PostDetailsComponent, canActivate: [AuthGuard, BlockedGuard],  resolve: { res: SinglePostResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
