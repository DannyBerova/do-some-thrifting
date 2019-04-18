import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorService } from './interceptors/jwt-interceptor.service';
import { ResponceHandlerInterceptorService } from './interceptors/responce-handler.service';
import { SinglePostResolver } from './resolvers/post-details.resolver';
import { AuthService } from './services/auth.service';
import { PostService } from './services/post.service';
import { SingleUserResolver } from './resolvers/user-details.resolver';
import { UserAllResolver } from './resolvers/user-all.resolver';
import { PagerService } from './services/pager.service';

@NgModule({
  providers: [
    SinglePostResolver,
    SingleUserResolver,
    UserAllResolver,
    AuthService,
    PostService,
    PagerService,
    JwtInterceptorService,
    ResponceHandlerInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ResponceHandlerInterceptorService,
        multi: true
      }
  ]
})
export class CoreModule { }