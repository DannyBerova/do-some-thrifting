import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { AboutComponent } from './components/shared/about/about.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'auth',
    loadChildren: './components/authentication/authentication.module#AuthenticationModule',
  },
  {
    path: 'user',
    loadChildren: './components/user/user.module#UserModule',
  },
  {
    path: 'post',
    loadChildren: './components/post/post.module#PostModule',
  },
  { path: '**', component: NotFoundComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
